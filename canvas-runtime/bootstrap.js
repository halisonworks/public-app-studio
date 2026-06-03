// Canvas-runtime iframe bootstrap.
//
// MIRROR of the runtime logic in ../../src/utils/runtimeDependencies.js.
// The Studio shell (Vite-bundled) and this iframe (static, served from
// public/) cannot share modules without a multi-entry Vite config, so the
// transpile/load/execute pipeline is duplicated here. Keep the two files in
// sync when changing KNOWN_LIBS, the require() resolution, or error shapes.
//
// NOTE: the *load source* intentionally diverges — this Studio iframe loads
// React/Babel/chart-icon libs from vendored copies under ./vendor/ (offline +
// no cold-CDN latency), falling back to the original CDN URLs only if a local
// copy is missing. runtimeDependencies.js still loads straight from the CDN.

// React / ReactDOM load lazily, only when a *component* canvas is rendered,
// so the runtime iframe (and the full-HTML-document path) works without the
// esm.sh CDN. A pasted HTML page needs no React, no Babel, no network.
let React = null;
let ReactDOMClient = null;
let reactRoot = null;

const libraryCache = new Map();

// Minimal clsx/classnames-compatible class joiner. shadcn/ui artifacts (the
// default output shape of Claude, v0, Lovable) import `cn` from "@/lib/utils";
// that alias does not exist as an npm package, so esm.sh resolution fails and
// the component renders as a red "Missing Library" box. We shim it instead.
// This is the conditional-class join only, it does NOT run tailwind-merge's
// conflict resolution (a P1 follow-up), which only affects duplicate-utility
// dedupe, not correctness.
function cnShim(...args) {
  const out = [];
  const push = (value) => {
    if (!value) return;
    if (typeof value === 'string' || typeof value === 'number') {
      out.push(String(value));
    } else if (Array.isArray(value)) {
      value.forEach(push);
    } else if (typeof value === 'object') {
      for (const key in value) {
        if (value[key]) out.push(key);
      }
    }
  };
  args.forEach(push);
  return out.join(' ');
}

// `@/lib/utils` is the conventional shadcn home for `cn`. Expose cn as both a
// named and default export so either import style resolves.
const SHADCN_UTILS = { __esModule: true, cn: cnShim, default: cnShim };

// React / ReactDOM load from vendored UMD bundles first (offline + no cold-CDN
// latency); esm.sh is kept only as a fallback if the local copies are missing.
// The UMD builds set window.React / window.ReactDOM (the latter exposes
// createRoot in React 18), which is also what the chart/icon UMD libs read.
async function ensureReact() {
  if (reactRoot) return;
  try {
    await loadScript('./vendor/react.production.min.js');
    await loadScript('./vendor/react-dom.production.min.js');
    React = window.React;
    ReactDOMClient = window.ReactDOM;
    if (!React || !ReactDOMClient || typeof ReactDOMClient.createRoot !== 'function') {
      throw new Error('Vendored React UMD did not expose the expected globals.');
    }
  } catch (_) {
    const [reactMod, reactDomMod] = await Promise.all([
      import('https://esm.sh/react@18'),
      import('https://esm.sh/react-dom@18/client'),
    ]);
    React = reactMod.default ?? reactMod;
    ReactDOMClient = reactDomMod;
    window.React = React;
    window.ReactDOM = ReactDOMClient;
  }
  // lucide-react's UMD reads `window.react` (lowercase) when it initialises;
  // React's UMD only sets `window.React`, so without this alias lucide throws
  // "Cannot read properties of undefined (reading 'forwardRef')" at load and its
  // icons fall back to red "Missing Library" boxes.
  window.React = React;
  window.react = React;
  reactRoot = ReactDOMClient.createRoot(rootEl);
}

const KNOWN_LIBS = {
  react: () => React,
  'react-dom': () => ReactDOMClient,
  recharts: () => window.Recharts,
  // lucide-react's UMD bundle assigns the global `LucideReact`, not `lucide`
  // (which is the vanilla DOM library). Read the correct one so the icons used
  // by most AI-generated components resolve.
  'lucide-react': () => window.LucideReact,
  'prop-types': () => window.PropTypes,
  '@/lib/utils': () => SHADCN_UTILS,
};

// External deps that are vendored locally as ES modules. These stay OUT of
// KNOWN_LIBS so they're still treated as "unknown" modules (and resolved via
// loadLibraryFromCDN), but loadLibraryFromCDN imports the local copy instead of
// reaching esm.sh, so they work offline.
const LOCAL_ESM_MODULES = {
  classnames: './vendor/esm/classnames.js',
};

// shadcn/ui components are copy-pasted source, not an npm package, so
// `@/components/ui/<name>` imports cannot be fetched from esm.sh and otherwise
// render as a red "Missing Library" box. We resolve any such import to a
// passthrough proxy: each named export becomes a forwardRef component that
// spreads its props onto a sensible host element and renders its children.
// Radix-only behaviors (asChild Slot merging, portals) are not reproduced.
// MIRROR of the same block in ../../src/utils/runtimeDependencies.js.
const SHADCN_UI_PREFIX = '@/components/ui/';

const SHADCN_TAGS = {
  Button: 'button', Input: 'input', Textarea: 'textarea', Label: 'label',
  Badge: 'span', Separator: 'hr', Checkbox: 'input', Switch: 'button',
  Slider: 'input', Avatar: 'span', Skeleton: 'div',
};

function makeShadcnComponent(exportName) {
  const tag = SHADCN_TAGS[exportName] || 'div';
  const Component = React.forwardRef((props, ref) => {
    const { asChild, children, ...rest } = props || {};
    return React.createElement(tag, { ref, ...rest }, children);
  });
  Component.displayName = `Shadcn(${exportName})`;
  return Component;
}

const shadcnUiProxies = new Map();

function createShadcnUiProxy(modulePath) {
  if (shadcnUiProxies.has(modulePath)) return shadcnUiProxies.get(modulePath);
  const members = {};
  const proxy = new Proxy(
    { __esModule: true },
    {
      get(_target, prop) {
        if (prop === '__esModule') return true;
        if (prop === 'default' || typeof prop !== 'string') return undefined;
        if (!members[prop]) members[prop] = makeShadcnComponent(prop);
        return members[prop];
      },
    }
  );
  shadcnUiProxies.set(modulePath, proxy);
  return proxy;
}

class RuntimeDependencyError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'RuntimeDependencyError';
    this.code = options.code ?? 'runtime_dependency_error';
    this.cause = options.cause ?? null;
  }
}

class ComponentExecutionError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ComponentExecutionError';
    this.code = options.code ?? 'component_execution_error';
    this.cause = options.cause ?? null;
  }
}

function toRuntimeDependencyError(message, options = {}) {
  return new RuntimeDependencyError(message, options);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () =>
      reject(toRuntimeDependencyError(`Failed to load ${src}`, { code: 'script_load_failed' }));
    document.head.appendChild(script);
  });
}

// Load a vendored UMD bundle, falling back to its CDN URL only if the local
// copy is unavailable. Keeps the runtime working offline and fast while
// preserving the original CDN behavior as a safety net.
async function loadVendorScript(localSrc, cdnSrc) {
  try {
    await loadScript(localSrc);
  } catch (_) {
    await loadScript(cdnSrc);
  }
}

async function ensureBabelReady() {
  if (window.Babel) return;
  try {
    await loadScript('./vendor/babel.min.js');
  } catch (_) {
    try {
      await loadScript('https://unpkg.com/@babel/standalone/babel.min.js');
    } catch (error) {
      throw toRuntimeDependencyError('Unable to load the Babel runtime.', {
        code: 'babel_unavailable',
        cause: error,
      });
    }
  }
}

async function ensureRuntimeLibrariesReady() {
  if (window.Recharts && window.LucideReact) return;
  try {
    await Promise.all([
      window.PropTypes
        ? Promise.resolve()
        : loadVendorScript(
            './vendor/prop-types.min.js',
            'https://unpkg.com/prop-types@15.8.1/prop-types.min.js'
          ),
      window.LucideReact
        ? Promise.resolve()
        : loadVendorScript(
            './vendor/lucide-react.umd.js',
            'https://unpkg.com/lucide-react@0.344.0/dist/umd/lucide-react.js'
          ),
    ]);

    if (!window.Recharts) {
      await loadVendorScript(
        './vendor/recharts.umd.js',
        'https://unpkg.com/recharts@2.12.7/umd/Recharts.js'
      );
    }

    await new Promise((resolve) => window.setTimeout(resolve, 100));
  } catch (error) {
    throw toRuntimeDependencyError('Unable to load the runtime chart/icon libraries.', {
      code: 'runtime_libraries_unavailable',
      cause: error,
    });
  }
}

function extractRequiredModules(transpiledCode) {
  const matches = [...transpiledCode.matchAll(/require\s*\(\s*["']([^"']+)["']\s*\)/g)];
  return [...new Set(matches.map((match) => match[1]))];
}

// Next.js / React Server Component artifacts (v0, Lovable, Next app-router
// output) begin with a `"use client"` or `"use server"` directive. It is a
// no-op in App Studio's client-only runtime, so strip a leading run of those
// directives before transpile.
// MIRROR of stripClientDirectives in ../../src/utils/runtimeDependencies.js.
function stripClientDirectives(code) {
  return code.replace(/^[\s﻿]*(?:["']use (?:client|server)["']\s*;?\s*)+/i, '');
}

function transpileComponentCode(code) {
  try {
    return window.Babel.transform(stripClientDirectives(code), {
      // 'typescript' strips TS type annotations (interfaces, type aliases,
      // `: Props`, generics) that Claude / v0 / ChatGPT TSX artifacts carry;
      // isTSX + allExtensions make it parse JSX in every input. It runs before
      // 'react' (presets apply in reverse), leaving plain JSX for preset-react.
      presets: [
        'react',
        'env',
        ['typescript', { isTSX: true, allExtensions: true, allowDeclareFields: true }],
      ],
      parserOpts: { allowReturnOutsideFunction: true },
      sourceType: 'unambiguous',
      filename: 'canvas.tsx',
    }).code;
  } catch (error) {
    throw new ComponentExecutionError('Unable to transpile the component source.', {
      code: 'transpile_failed',
      cause: error,
    });
  }
}

function getUnknownModules(transpiledCode) {
  return extractRequiredModules(transpiledCode).filter(
    (name) => !KNOWN_LIBS[name] && !libraryCache.has(name) && !name.startsWith(SHADCN_UI_PREFIX)
  );
}

// Classify where a required module resolves from, for the render load log:
// a built-in runtime lib, one of the local shims, a locally vendored ES module,
// or an on-demand esm.sh fetch.
function describeDependencySource(name) {
  if (name.startsWith(SHADCN_UI_PREFIX)) return 'shadcn-shim';
  if (name === '@/lib/utils') return 'cn-shim';
  if (KNOWN_LIBS[name]) return 'runtime';
  if (LOCAL_ESM_MODULES[name]) return 'vendor';
  return 'cdn:esm.sh';
}

async function loadLibraryFromCDN(name) {
  if (libraryCache.has(name)) return libraryCache.get(name);

  if (KNOWN_LIBS[name]) {
    const knownLibrary = KNOWN_LIBS[name]();
    if (knownLibrary) return knownLibrary;
  }

  try {
    // Common external deps are vendored as local ES modules so they resolve
    // offline; anything else still loads on demand from esm.sh.
    const localEsm = LOCAL_ESM_MODULES[name];
    const module = localEsm
      ? await import(/* @vite-ignore */ localEsm)
      : await import(/* @vite-ignore */ `https://esm.sh/${name}?external=react,react-dom`);
    const resolvedLibrary =
      module.default && Object.keys(module).length === 1 ? module.default : module;
    libraryCache.set(name, resolvedLibrary);
    return resolvedLibrary;
  } catch (error) {
    throw toRuntimeDependencyError(`Unable to load external dependency "${name}".`, {
      code: 'external_dependency_load_failed',
      cause: error,
    });
  }
}

function resolveRuntimeLibrary(name) {
  if (name.startsWith(SHADCN_UI_PREFIX)) {
    return createShadcnUiProxy(name);
  }
  if (KNOWN_LIBS[name]) {
    const knownLibrary = KNOWN_LIBS[name]();
    if (knownLibrary) return knownLibrary;
  }
  if (libraryCache.has(name)) return libraryCache.get(name);
  return window[name] ?? null;
}

function executeComponentCode(transpiledCode, requireFn) {
  try {
    const exports = {};
    const module = { exports };
    const executeComponent = new Function('exports', 'require', 'module', 'React', transpiledCode);
    const result = executeComponent(exports, requireFn, module, React);
    return result || module.exports.default || module.exports;
  } catch (error) {
    throw new ComponentExecutionError('Unable to execute the rendered component.', {
      code: 'execution_failed',
      cause: error,
    });
  }
}

function formatRuntimeError(error) {
  if (!error) return 'Unknown runtime error.';
  if (error instanceof RuntimeDependencyError || error instanceof ComponentExecutionError) {
    if (error.cause) {
      const causeMessage = error.cause.message ?? String(error.cause);
      return `${error.message}\n\n${causeMessage}`;
    }
    return error.message;
  }
  return error.message ?? String(error);
}

function createMissingLibraryProxy(name) {
  return new Proxy({}, {
    get: (_target, prop) => {
      if (prop === '__esModule') return false;
      return () =>
        React.createElement(
          'div',
          {
            className:
              'text-red-500 text-xs p-2 border border-red-200 bg-red-50 rounded',
          },
          `Missing Library: ${name}.${String(prop)}`
        );
    },
  });
}

function isRenderableComponent(candidate) {
  return (
    candidate &&
    (typeof candidate === 'function' ||
      (typeof candidate === 'object' && Object.keys(candidate).length > 0))
  );
}

function postToParent(message) {
  try {
    window.parent.postMessage(message, '*');
  } catch (_) {
    /* parent gone */
  }
}

const rootEl = document.getElementById('root');

let lastRenderedCode = null;

// Heuristic: a paste is a standalone HTML document (typical of Gemini Canvas)
// rather than a JSX component if it starts with <!DOCTYPE html> or <html>.
// We render those as-is in a nested srcdoc iframe instead of running them
// through Babel, Babel can't parse `class="..."`, `<style>`, raw `<script>`,
// or DOCTYPE declarations.
function looksLikeHtmlDocument(code) {
  const trimmed = code.trimStart();
  return /^<!doctype\s+html/i.test(trimmed) || /^<html[\s>]/i.test(trimmed);
}

function renderHtmlCanvas(html) {
  // Tear down any prior React-mounted content, replace the root with a nested
  // iframe whose document is the pasted HTML. The inner iframe runs the HTML's
  // own scripts (including any CDN Tailwind), styles, and event handlers
  // exactly as a browser would, no transpilation, no conversion.
  if (reactRoot) reactRoot.render(null);
  rootEl.innerHTML = '';
  const inner = document.createElement('iframe');
  inner.id = 'canvas-html-iframe';
  inner.title = 'Canvas HTML document';
  inner.style.cssText = 'width:100%;height:100%;border:0;display:block;';
  inner.setAttribute('srcdoc', html);
  rootEl.appendChild(inner);
  // Make sure the host iframe body fills the viewport so the nested iframe
  // has somewhere to expand into.
  document.documentElement.style.height = '100%';
  document.body.style.height = '100%';
  rootEl.style.height = '100%';
  // HTML documents load their own scripts inside the nested iframe, so there are
  // no React external dependencies for the load log to track.
  postToParent({ type: 'loadReport', report: { kind: 'html', dependencies: [], status: 'rendered', error: null } });
  postToParent({ type: 'rendered' });
}

async function renderCanvas(code, kind) {
  if (code === lastRenderedCode) {
    return;
  }
  lastRenderedCode = code;

  if (!code) {
    if (reactRoot) reactRoot.render(null);
    rootEl.innerHTML = '';
    postToParent({ type: 'rendered' });
    return;
  }

  // The shell passes an authoritative `kind` (from src/utils/detectCanvasKind);
  // fall back to the local heuristic if an older message omits it.
  const isHtml = kind === 'html' || (kind == null && looksLikeHtmlDocument(code));
  if (isHtml) {
    try {
      renderHtmlCanvas(code);
    } catch (err) {
      const message = formatRuntimeError(err);
      postToParent({ type: 'loadReport', report: { kind: 'html', dependencies: [], status: 'error', error: message } });
      postToParent({ type: 'error', message });
    }
    return;
  }

  // If we're switching back from an HTML render to a JSX render, drop the
  // HTML iframe so React can take over `#root` again.
  if (rootEl.querySelector('#canvas-html-iframe')) {
    rootEl.innerHTML = '';
    reactRoot = null;
  }

  // Accumulate the render load report (consumed by the Studio shell's render
  // log). It records every module the file imports, how each resolves, and
  // whether it loaded, so a missing/failing external dependency is captured
  // rather than just producing a blank canvas.
  const report = { kind: 'component', dependencies: [], status: 'rendered', error: null };

  try {
    await ensureReact();
    await ensureBabelReady();
    await ensureRuntimeLibrariesReady();
    const transpiledCode = transpileComponentCode(code);
    const required = extractRequiredModules(transpiledCode);
    const unknownModules = getUnknownModules(transpiledCode);

    // Known / shim modules resolve synchronously from globals or proxies. Verify
    // each actually resolved so a misconfigured runtime lib (e.g. a global-name
    // mismatch) is reported as failed instead of a false "loaded".
    for (const name of required) {
      if (unknownModules.includes(name)) continue;
      const resolved = resolveRuntimeLibrary(name);
      report.dependencies.push({
        name,
        source: describeDependencySource(name),
        status: resolved ? 'loaded' : 'failed',
        error: resolved ? null : 'Runtime library global not found.',
      });
    }

    // Unknown modules load now and may fail (the case this log exists to
    // surface), so load them one at a time and record each outcome instead of
    // failing the whole batch on the first error.
    let dependencyError = null;
    if (unknownModules.length > 0) {
      postToParent({ type: 'loadingLibs', libs: unknownModules });
      for (const name of unknownModules) {
        const source = describeDependencySource(name);
        try {
          await loadLibraryFromCDN(name);
          report.dependencies.push({ name, source, status: 'loaded', error: null });
        } catch (err) {
          dependencyError = dependencyError || err;
          report.dependencies.push({ name, source, status: 'failed', error: formatRuntimeError(err) });
        }
      }
    }

    if (dependencyError) throw dependencyError;

    const requireFn = (name) => resolveRuntimeLibrary(name) ?? createMissingLibraryProxy(name);
    const Component = executeComponentCode(transpiledCode, requireFn);

    if (!isRenderableComponent(Component)) {
      report.status = 'error';
      report.error =
        "Could not find a component to render. Ensure the code has 'export default Component;'";
      postToParent({ type: 'loadReport', report });
      postToParent({ type: 'error', message: report.error });
      return;
    }

    reactRoot.render(React.createElement(Component));
    postToParent({ type: 'loadReport', report });
    postToParent({ type: 'rendered' });
  } catch (err) {
    report.status = 'error';
    report.error = formatRuntimeError(err);
    postToParent({ type: 'loadReport', report });
    postToParent({ type: 'error', message: report.error });
  }
}

window.addEventListener('message', (event) => {
  const data = event.data;
  if (!data || typeof data !== 'object') return;

  if (data.type === 'render') {
    renderCanvas(data.code ?? '', data.kind);
  } else if (data.type === 'reset') {
    lastRenderedCode = null;
    if (reactRoot) reactRoot.render(null);
  } else if (data.type === 'screenshot') {
    // Fallback path: parent asks the iframe to screenshot its own body.
    (async () => {
      try {
        const mod = await import('https://esm.sh/modern-screenshot@4.4.39');
        const blob = await mod.domToBlob(document.body, {
          backgroundColor: '#f8fafc',
          scale: 2,
        });
        postToParent({ type: 'screenshot-result', blob });
      } catch (err) {
        postToParent({ type: 'screenshot-error', message: formatRuntimeError(err) });
      }
    })();
  }
});

// Signal ready immediately: Babel, React, and the chart/icon libraries now
// load lazily on the first *component* render, so an HTML-document canvas
// renders with no network round-trip and the shell can stop showing the
// "Loading Compiler & Libraries..." overlay right away.
postToParent({ type: 'ready' });
