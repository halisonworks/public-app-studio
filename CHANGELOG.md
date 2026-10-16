# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.9], 2026-06-20

### Added

- **Packaged apps show a launch attribution splash.** Every standalone app built with KIT Apps now opens with a brief "Built with KIT Apps by Halison.io" splash that fades to reveal the canvas, so the brand travels with packaged apps. Suppressed in the CI smoke run.

### Changed

- **Building installers is now a Pro feature.** Free users can render, save, organise, and export canvases; packaging a canvas as a standalone app requires a license. The Package panel shows an "Upgrade to build installers" prompt for free users, and the build pipeline refuses for unlicensed users (defence in depth). Apps built by Pro users still carry the launch attribution splash.
- **App wordmark is now "KIT Apps by Halison.io"** (was "KIT Apps by Halison"), aligning the in-app header, finalize wizard, and Help menu with the master brand. The free-output watermark string ("Made with KIT Apps by Halison.io") is unchanged.

### Fixed

- **Package → Library tab no longer gets stuck.** After a build finished, the sidebar stayed pinned to the Package view and the Library tab did nothing; the view is now pinned to Package only while a build is actively running.

## [0.3.8], 2026-06-19

### Changed

- **Renamed App Studio to KIT Apps** (product family: KIT). New product name, window title, install directory, and bundle identifier (`com.halisonworks.kitapps`); native project/share extension is now `.kitapp` (legacy `.appstudio` still opens). The localStorage canvas key and the `app-studio/canvas@1` share schema are unchanged, so existing saved canvases carry over. (#48)
- **Upgraded the build toolchain to Vite 8 (Rolldown)** and `@vitejs/plugin-react` 6, deduping the toolchain onto a single Vite. No app or config changes required. (#51)

### Fixed

- **Resolved all 21 npm audit advisories** (1 critical, 5 high) down to **0** — including the `jspdf` PDF object injection, plus `undici`, `ws`, `picomatch`, `js-yaml`, `postcss`, `protobufjs`, and the OpenTelemetry chain; the last two (esbuild/vite dev-server) cleared by the Vite 8 upgrade. (#50, #51)
- **CI lane restored.** Re-synced `package-lock.json` with `package.json` so `npm ci` succeeds, and fixed the telemetry anonymizer to null `$ip` as documented. (#49)

## [0.3.7], 2026-06-04

### Added

- **Team data sharing for packaged apps (`window.appStudio.shared`).** A packaged app (a CRM, a shared tracker) can now share its data across a small team over a shared/synced folder — OneDrive, Dropbox, or an SMB share — with **no server and no login**. Each client appends to its own log in the folder; current state is the deterministic, conflict-free merge of all clients' logs (concurrent edits never clash; same-record edits resolve last-writer-wins). API: `configure` / `chooseFolder` / `put` / `del` / `list` / `subscribe`. (#27, #28)

## [0.3.6], 2026-06-03

### Added

- **`window.appStudio.storage` — a durable per-app key/value store.** A canonical async, structured store backed by IndexedDB (larger than localStorage, holds objects), namespaced per app, available both in Studio previews and in packaged apps. For CRMs, receipts apps, and anything that outgrows localStorage. (#24)
- **Export / Import app data.** "Export data" / "Import data" in the Package panel back up and restore the data an app saved (both its namespaced localStorage and `appStudio.storage`) to a JSON file — for backup, moving machines, or recovery. (#25)

## [0.3.5], 2026-06-03

### Changed

- **Packaged apps now get isolated, durable data storage.** Each packaged app scopes its web storage to its own `bundleId` instead of sharing one profile across every packaged app, so two data apps (e.g. a CRM and a receipts app) no longer collide — and the data survives updates and reinstalls (same `bundleId` → same store). (#21)
- **Canvas storage is namespaced in Studio.** A canvas's `localStorage` is scoped per-canvas so it can neither read nor clobber KIT Apps's own library or another canvas's data. The Bundle ID field now notes it is the app's permanent storage identity. (#22)

## [0.3.4], 2026-06-03

### Added

- **Plain-language render errors + a "fix request" loop.** When a canvas fails to render, the error overlay now explains what went wrong in plain language and offers a "Copy a fix request for your AI" button — it puts the error, the full source, and a single-file constraint on the clipboard, ready to paste back into ChatGPT/Claude/Gemini for a corrected version. No accounts, no API keys, fully local.
- **Share-as-link.** "Copy share link" puts a canvas into a browser URL (encoded in the link fragment) so a recipient can open it with no install and no account — nothing is stored on a server. Rendered by a static viewer (`share-view`) reusing the canvas runtime. The viewer's public URL is build-time configurable via `VITE_SHARE_BASE_URL`; until set, the action is disabled.

## [0.3.3], 2026-06-03

### Added

- **Edit a saved canvas's code in place.** An "Edit" action (in the toolbar and on each canvas card) reopens the editor on the selected canvas; saving replaces its source while keeping the canvas's name, category, quick-launch slot, and packaging. A bare name keeps the canvas's original extension (an HTML canvas does not become a `.jsx` one).
- **Load `.appstudio`/`.html` from the Load dialog**, and register file associations at runtime on launch (`file_assoc.rs`), in addition to the installer's associations.

### Fixed

- **Packaging:** write the generated `installer.nsi` with a UTF-8 BOM so `makensis` preserves non-ASCII app names.

## [0.3.2], 2026-06-02

### Added

- **Open `.appstudio` files directly.** Double-clicking a `.appstudio` share file, choosing "Open with → KIT Apps", or passing its path as a launch argument now opens KIT Apps and imports the canvas it carries (name + packaging). Windows registers `.appstudio` as KIT Apps's own file type at install time; the `open-file` handler parses the share document instead of treating it as raw component code.

### Changed

- **Halison brand mark.** KIT Apps adopts the Halison "H" mark: a new application icon / browser favicon set (transparent, square, and reverse variants) and the in-app header logo. The previous Metanoia icons are archived under `branding/metanoia-logos/`.

## [0.3.1], 2026-05-30

### Changed

- **Packaging rebuilt on a prebuilt Runtime (decision D13).** Packaging a canvas no longer compiles a Tauri app per canvas (`npm install` + `cargo`, minutes, plus a local Node/Rust/MSVC toolchain). A canvas-agnostic Runtime binary is now compiled once and shipped inside KIT Apps; packaging copies it, writes a per-app `manifest.json` the binary reads at startup, stamps identity/icon with `rcedit`, and wraps a per-user installer with NSIS (`makensis`). Result: packaging takes seconds and needs no toolchain on the user's machine. `rcedit` + portable NSIS are bundled as KIT Apps resources. New: `templateInstaller.js`, `build-prebuilt-runtime.js`, `fetch-packaging-tools.js`, `package-fixture.js`, `runtime/prebuilt/`, the Rust `read_manifest` and `package_canvas` commands, and `npm run packaging:prepare`. Windows CI and `release.yml` rewired to the prebuilt path; the old compile-based fixture was removed.
- **Sidebar Library / Package tabs.** The left sidebar now switches between the canvas Library and the per-canvas Package view via a segmented control instead of stacking both; the Package tab is enabled only when a canvas is selected and auto-selects while a build runs.

### Fixed

- **"Open folder" after a build** now works (the `shell.open` allowlist scope only permitted URLs, not filesystem paths).
- **Packaging panel** scrolls when its contents exceed the viewport.
- **Build progress** shows liveness (pulsing dot, elapsed timer, latest log line) and mirrors to a serialized disk log at `%LOCALAPPDATA%\com.halisonworks.kitapps\build-log.txt`.
- **`path` Tauri allowlist** enabled so packaging can resolve `appCacheDir` / bundled resources.

## [0.3.0], 2026-05-29

The "Warmth & Logic" release. The chrome moves from the cool slate "Stagehand" workshop palette to a warm, consumer-grade design system (soft off-white surfaces, a brick-coral primary, Inter, generous rounding, soft ambient shadows), and the product gains the library, sharing, and packaging surfaces the Stitch designs called for. Brand wordmark is now "KIT Apps by Halison". 110 to 163 unit tests; chrome/state/keyboard/packaging e2e green throughout. Local-only: no backend, account, or cloud.

### Added

- **Quick-launch strip.** Ten numbered tiles under the toolbar pin favourite canvases for one-click or `Ctrl/Cmd+1..0` launch; pins persist and prune when a canvas is deleted.
- **Categorized library.** The sidebar groups canvases into collapsible, tinted categories with create / rename / recolour / delete, a per-canvas move control, an Uncategorized catch-all, and an "All apps" flat view.
- **Share dialog.** Three local-only ways to share: the KIT Apps file (save / copy), a locked standalone upgrade prompt, and output export (PNG / PDF).
- **Import welcome-in.** Opening a shared `.appstudio` file shows a warm welcome screen with the canvas name and a "local only, no account required" line, offering Import to Library or Preview as Guest.
- **Create New App modal.** The "New" flow is a centered modal with an App Name field and a Category picker, preserving the full paste keyboard contract.
- **Finalize-as-app wizard.** A full-screen create-standalone screen with app name, icon grid, accent choice, and a live preview tile, wrapping the existing packaging validation and build.
- **First-run onboarding.** A short Turn-AI-into-Apps carousel, dismissed once via a localStorage seen-flag.
- **Save-success toast** with Run / Share / Library next steps.
- **Export PDF** toolbar action alongside Export PNG.
- **Free-tier watermark.** Exported PNG and PDF carry the exact "Made with KIT Apps by Halison.io" mark for free users; paid output is clean.

### Changed

- **Design system rewritten** to "Warmth & Logic" in `tailwind.config.js`, `DESIGN.md`, and `.impeccable/design.json`. Brand wordmark is now "KIT Apps by Halison". Inter is self-hosted via `@fontsource/inter` (no runtime Google Fonts CDN).
- **Paste editor** moved from the dark code surface to a light warm Create New App modal.
- Whole-list arrow-key navigation restored across category groups.

## [0.2.0], 2026-05-19

Full chrome rewrite against a codified design system. Editor view and packaging panel both converged at 40/40 on Nielsen heuristic scoring across multiple critique passes; empty state and canvas sidebar through full restructures. 23 commits in a single arc; all 110 unit tests + 9 state-and-keyboard e2e tests green throughout.

### Added

- **Design system docs.** `PRODUCT.md`, `DESIGN.md`, and `.impeccable/design.json` codify the system, 19 colors, 5 typography tiers, 9 Named Rules (including The Compile Green Rule, The Two-Step Destruction Rule, The Dual Focus-Ring Rule, The Dark-Hint Color Rule), both light and dark sanctioned surfaces, all rooted in the Stagehand North Star: *chrome is service, canvas is actor*.
- **Keyboard contracts everywhere.** Editor: `Esc` cancels (dirty-aware two-step), `Ctrl/Cmd+S` saves to library, `Tab/Shift+Tab` insert/dedent a literal tab, `F6` non-destructive escape (WCAG SC 2.1.2). Packaging: `Ctrl/Cmd+B` builds, `Esc` cancels a running build. Empty state: `Ctrl/Cmd+O` loads, `Ctrl/Cmd+V` opens the editor pre-filled from clipboard. Sidebar: `ArrowUp/Down/Home/End` move focus, `F2` rename, `Del/Backspace` arm two-step delete on the focused card. All shortcuts are surfaced via visible 11px hints AND `aria-keyshortcuts` for assistive tech.
- **Draft persistence.** In-progress paste is mirrored to `localStorage` under `gview_editor_draft_v1`; refresh mid-paste auto-resumes with a "Draft restored" hint that dismisses on first edit.
- **Save / Export split.** Save adds to the canvas library without a file dialog. Export is a new per-card action that writes the canvas to disk via the platform adapter.
- **Build cancellation.** New Rust `abort_build` Tauri command kills the running `npm install` / `tauri build` child process tree (`taskkill /T /F` on Windows, `kill -TERM` on Unix). Frontend reports "Build cancelled." instead of raw exit codes.
- **Build error hints.** Common failure modes (missing Node / Rust / WebView2 / MSVC linker / no artifact / user-cancelled) translate to one-line actionable messages with install URLs. Raw stderr remains visible underneath for debugging.
- **Build success affordances.** "Open folder" reveals the installer in Explorer / Finder via `shell.open`. "Copy path" writes to clipboard with a "Copied" confirmation. "Dismiss" clears the success / failure state without switching canvases.
- **Packaging panel collapse-by-default.** Single summary row with a phase-aware status badge ("Ready" / "N errors" / "Preparing…" / "Installing deps…" / "Compiling…" / "Finalizing…" / "Installer ready" / "Build failed"); expanded on click; force-open while a build runs.
- **Canvas-sidebar collapsible.** Toggle to a 48 px rail when the user doesn't need the library visible; preference persists in `localStorage` under `gview_sidebar_collapsed_v1`.
- **Canvas-sidebar filter.** Flush-mounted search input in the header (replaces the decorative "Saved Canvases" title, which is now `sr-only`). Case-insensitive substring filter; `Esc` to clear; `N/M` count badge while filtering.
- **Canvas-card delete countdown.** 3 s `transform: scaleX(0)` shrink-bar under the armed "Confirm delete" button, the destruction window is now visible to sighted users.
- **Live-region announcements.** Delete / Duplicate / Export commits are announced to screen readers via `role="status" aria-live="polite"`. Focus automatically moves to the next card (or to the filter input if the list emptied) after a delete.
- **Inline canvas-card rename.** Double-click or click "Rename" → in-place input with Enter / Esc / blur to commit. Replaces `window.prompt`.
- **Empty-state drop validation.** Drops of files outside `.jsx/.tsx/.js/.ts/.txt` surface an inline error (`Drop a .jsx or .tsx file. Got "report.png".`) with `role="alert"` and auto-clear after 5 s. Replaces silent downstream failure.
- **Always-visible canvas-card actions.** Rename / Duplicate / Export / Delete are now visible on every card at rest, not only on hover/focus-within. Closes the discoverability gap for touch and screen-reader users.

### Changed

- **Full chrome rewrite.** Every workbench surface (sidebar header, canvas-card actions, top nav, editor view, packaging panel, empty state) restructured against the new design system. Background colour neutrals shift to tinted Drafting Paper / Workshop Slate / Console Ink; borders and dividers reach 1 px Workbench Grey.
- **Build installer button is now Compile Green** (was Console Ink, violated DESIGN.md's *The Compile Green Rule*: "green means produces an artifact").
- **Packaging Validate button removed.** Validation derives via `useMemo` from `activeFile.packaging` and surfaces live as the user types. The "fill → submit → submit again" friction is gone; the Build button's enabled state IS the validation signal on desktop.
- **Top-nav button hierarchy.** Load is the single primary (Console Ink fill); New is secondary (outline); Print and Export PNG collapse to icon-only ghost buttons with `aria-label`s; Help is a quiet ghost button.
- **Editor strip vocabulary.** "New canvas: paste JSX below" (colon, per PRODUCT.md's *no em dashes* voice rule).
- **Stale "(dry run, bundling not yet implemented)" copy** replaced with accurate "Validated. Ready to build." (desktop) / "Validated. Bundling requires the desktop app." (web).

### Fixed

- **WCAG 2.1 AA contrast on dark-surface hints.** Strip hints in the editor and packaging use `text-slate-400` (~6.6:1 on Workshop Slate) instead of `text-slate-500` (4.1:1, sub-AA for small text). Codified as *The Dark-Hint Color Rule*.
- **Silent `Ctrl+S` on whitespace-only buffer**, now announces "Cannot save. Paste code to enable." via a transient polite live region.
- **Drag-over visual doubling**, the empty-state's own drag-active style and the full-container overlay no longer both fire when the empty state is showing. DESIGN.md's empty-state spec says *"the target IS the affordance"*; the system now honors it.
- **Empty-state and overlay vocabulary** unified on "Drop to render" (overlay previously said "Drop to add as a new canvas", same gesture, two verbs).
- **Disabled-button hover shimmer.** Disabled Save canvas / Print / Export PNG / Load / New no longer animate color on hover at 40% opacity. Each disabled state now locks its hover color via `disabled:hover:*`.
- **Graphify `file_type='concept'` warning** on the two brand-identity nodes (`viewr_brand_mark`, `metanoia_brand`). Both now use the sanctioned `rationale` enum value.

### Internal

- 110 unit tests (up from 94 at v0.1.7), additions cover save / export, draft persistence, error hints, abort path, sidebar keyboard nav.
- 9 state-and-keyboard Playwright tests cover the new flows (Ctrl+S, F6, Cancel two-step, Save-disabled-on-empty, whitespace-Ctrl+S announcement, packaging panel collapse).
- CDN-dependent rendering e2e tests remain environmentally flaky on this machine (Babel / esm.sh fetches); not related to this release.
- Three product-management questions deferred to v0.3 discussion: empty state as a "Recent canvases" view after the user has saved some, "Paste" as the primary verb instead of "Drop," and canvas-card list partitions (pinned / recent / archive) at scale.

## [0.1.7], 2026-05-06

### Added

- **`npm run lint:design`**, runs `impeccable detect src/app.jsx src/components/` to flag AI-generated UI tells (low contrast, nested cards, indigo/purple palette, bounce easing) in the workbench chrome. Skips `src/smartcrowding.jsx` and `src/viewer/` since those are sample/secondary content, not the chrome itself.

### Changed

- **Studio's Tailwind safelist removed.** v0.1.4's iframe takeover means canvas styling is fully owned by the iframe's own JIT (`public/canvas-runtime/tailwindcss.js`); Studio's main bundle no longer needs to enumerate the full Tailwind palette as a fallback. Studio's bundled CSS shrinks **524 KB → 18 KB** (68 KB → 4.2 KB gzipped). `tailwind-safelist.js` is unchanged because Runtime still consumes it for packaged apps.

### Fixed

- **Chrome design issues flagged by impeccable.** Live scan against the dev server reported four anti-patterns; all addressed:
  - `text-slate-400` on white (2.6:1) → `text-slate-500` (4.6:1, passes WCAG AA) across the sidebar, packaging panel, empty state, and Help menu header.
  - Canvas-list cards no longer render with a border, and the empty-state placeholder is now plain text rather than a dashed card, eliminating the card-inside-card pattern in the sidebar.
  - Indigo/purple palette and `animate-bounce` keyframe no longer ship in Studio's CSS (resolved by the safelist removal above).

## [0.1.6], 2026-05-05

### Added

- **HTML document pastes are now supported as canvases.** Gemini Canvas (and ChatGPT, occasionally) sometimes produces a complete `<!DOCTYPE html>` document rather than a single React component, those used to fail at the Babel transpile step with no actionable error. The iframe bootstrap now detects HTML pastes (anything starting with `<!DOCTYPE html>` or `<html>`) and renders them inside a nested `srcdoc` iframe instead of running them through Babel. The HTML's own `<script>`, `<style>`, and `<link>` tags execute exactly as a browser would render them, so Gemini's typical `<script src="https://cdn.tailwindcss.com">` works without any conversion. Switching back to a JSX paste tears down the HTML iframe so React can take over again.

### Known limitations

- PNG export captures only the outer iframe element when the canvas is HTML, not the rendered content inside the nested srcdoc iframe. Use the OS screenshot tool for now; cross-iframe PNG capture is a follow-up.
- Packaging an HTML canvas as a standalone Runtime app isn't supported yet, Runtime expects a JSX component. The "Build Installer" button will fail validation. Ask the AI to convert the HTML to a React component first if you need the standalone app.

## [0.1.5], 2026-05-05

### Added

- **User manual** (`docs/user-manual.md`), end-user-focused walkthrough: prompt-AI → copy → paste → save → optionally package as MSI. Covers ChatGPT Canvas + Gemini Canvas extraction, prompt templates, six concrete use cases, packaging requirements, and troubleshooting.
- **"User manual" entry in the Help menu**, between Changelog and Tester guide. The manual is hosted on `main` so the link works for any installed version with internet access.

### Fixed

- **Runtime errors now surface the underlying cause.** Previously, a transpile failure or library-load failure showed only the wrapper message ("Unable to transpile the component source.") with no Babel/network details, making it impossible to tell whether you'd pasted the wrong shape of code (e.g. raw HTML instead of a JSX component) or hit a transient CDN issue. `formatRuntimeError` now appends `error.cause.message` when present, so the red error pane shows the original Babel/fetch error after a blank line.

## [0.1.4], 2026-05-05

### Changed

- **Canvas now renders inside a same-origin iframe with vendored Tailwind Play CDN.** Arbitrary Tailwind values that the static safelist can't enumerate, `text-[10px]`, `bg-[#abc]`, arbitrary gradients, transforms, filters, now render correctly in Studio's preview because the iframe runs Tailwind's JIT compiler against the canvas DOM. The Studio shell's compiled stylesheet stays clean: no preflight collision, no JIT scanning the shell's classes. The iframe is persistent across code changes (code edits diff via `postMessage`), so the Tailwind+React+Babel startup cost is paid once per session.
- **Vendored `public/canvas-runtime/tailwindcss.js`** (~400 KB, Tailwind 3.4.17 Play CDN bundle) ships inside `dist/` and the Tauri MSI. This preserves the v0.1.1 "no `cdn.tailwindcss.com` runtime dependency" stance for offline / air-gapped use. Other runtime CDN deps (React, Babel, Recharts, lucide-react, esm.sh dynamic imports) are unchanged.
- The transpile-and-execute pipeline that lived in `src/components/DynamicRenderer.jsx` moved to `public/canvas-runtime/bootstrap.js`. The shell-side `DynamicRenderer` is now a thin wrapper around the new `<CanvasIframe>`. The pipeline logic in `src/utils/runtimeDependencies.js` is unchanged and still unit-tested; bootstrap.js mirrors it (kept-in-sync comment in both files).
- Trade-off: iframe creation costs ~50–100 ms on first canvas render before `{ type: 'ready' }` arrives from the iframe; subsequent code edits are diff-only via `postMessage`. PNG export reads `iframe.contentDocument.body` directly (same-origin) and screenshots that.

## [0.1.3], 2026-05-05

### Changed

- **Studio's Tailwind safelist now matches Runtime's**, `tailwind.config.js` imports the combined `safelist` (core + extended) instead of just `coreSafelist`. Canvases preview with responsive prefixes (`md:`, `lg:`, ...), hover/focus state variants, the niche color palette (zinc, neutral, stone, lime, emerald, teal, cyan, sky, violet, fuchsia, pink, rose), and shades 50/900/950. Studio's CSS bundle grows by ~500 KB, acceptable on a desktop app loaded once at launch, in exchange for previews that match what packaged Runtime apps actually render.
- Note: arbitrary values (`text-[10px]`, `bg-[#abc]`, etc.) are still not covered by the static safelist; full fidelity for those requires JIT Tailwind in the canvas render area, tracked as a follow-up.

## [0.1.2], 2026-05-05

### Fixed

- **Halison install path now applied for users upgrading from v0.1.0.** The v0.1.1 WiX template carried over Tauri's default `RegistrySearch` for `INSTALLDIR`, which read the `Program Files\KIT Apps` path that v0.1.0 had written to `HKCU\Software\<manufacturer>\KIT Apps\InstallDir` and used it instead of the new `Halison\KIT Apps` directory hierarchy. The `RegistrySearch` is removed so the directory hierarchy in `src-tauri/wix/main.wxs` always wins; trade-off: a user-customized install path is no longer remembered across upgrades.

## [0.1.1], 2026-05-05

### Added

- **Help menu in the top nav**, opens external links via Tauri `shell.open` on desktop and `window.open` on web. Items: product page, latest release, changelog, tester guide, report-an-issue. Header shows the current app version.
- **Tester guide** (`docs/v0.1.0-tester-guide.md`), Windows tester walkthrough for download / install / UC1 / UC2 with a self-contained smoke canvas. Linked from the README.

### Changed

- **KIT Apps installs to `Program Files\Halison\KIT Apps\`** instead of `Program Files\KIT Apps\`, so all Halison products group under one folder. Implemented via a forked Tauri 1.x WiX template (`src-tauri/wix/main.wxs`) that wraps `INSTALLDIR` in a `Halison` directory. Existing v0.1.0 installs will be replaced when v0.1.1 is installed (MSI MajorUpgrade behavior).
- Tailwind safelist split into `coreSafelist` (Studio) and `extendedSafelist` (Runtime adds these on top of core). Studio's CSS bundle dropped from 1.35 MB to 524 KB (165 KB → 68 KB gzipped). Runtime keeps the full surface so produced installers render canvases at full fidelity.
- Runtime build dir layout extracted to `src/utils/packaging/runtimeBuildLayout.js`. The Tauri orchestrator (`buildCanvas.js`) and the Node CI fixture script (`scripts/build-fixture-runtime.js`) share a single source of truth for which files go where.

## [0.1.0], 2026-04-30

First shippable release. UC1 (save/reopen canvases) and UC2 (package as standalone Runtime app) are both built end-to-end and validated in CI.

### Added

- **Product**: renamed from ViewR to KIT Apps. Bundle identifier `com.halisonworks.kitapps`. Brand: Halison Works.
- **UC1, canvas workbench**:
  - paste or load `.jsx` files; live render via Babel
  - persistent canvas library sidebar (localStorage-backed)
  - rename, duplicate, delete canvases
  - auto-import inference for React hooks, Recharts, lucide-react
  - auto-load unknown libraries from esm.sh
  - runtime error boundary around user code
  - PNG export, native print
  - file associations on Windows (`.jsx` / `.tsx` / `.ts` via WiX fragment)
  - "Open with KIT Apps" handling from Explorer
- **UC2, packaging**:
  - per-canvas packaging metadata (app name, window title, bundle ID, icon path); auto-derived from the canvas name
  - sidebar editor with three text inputs and an icon picker
  - dry-run validation: bundle-ID reverse-DNS check, non-empty checks, length caps
  - custom icon upload (PNG)
  - "Build Installer" action, produces a real Windows `.msi` via `tauri build`
  - Tauri command `build_canvas` with stdout/stderr streamed as `build_progress` events
  - graceful errors when `npm` or `cargo` aren't on PATH (with install URLs)
- **Runtime template** (`runtime/`):
  - single-purpose Tauri app shell that mounts a canvas full-viewport
  - templated `package.json`, `index.html`, `tauri.conf.json`, `Cargo.toml` with `{{appName}}` / `{{windowTitle}}` / `{{bundleId}}` / `{{appNameSlug}}` placeholders
  - bundles its own Tailwind (no `cdn.tailwindcss.com` dependency at runtime)
- **Traceability chain** (`product/traceability/`):
  - problem → persona → journey → use-case → feature → story → code
  - `scripts/check-traceability.js` validates forward links and code references in CI
  - `scripts/audit-test-coverage.js` flags built stories without unit coverage
  - `scripts/query-traceability.js` exposes BFS queries (`solves <ID>`, `serves <path>`, `realizes <ID>`) via `npm run graph:query`
- **CI**:
  - `.github/workflows/ci.yml`, Ubuntu lane on every push/PR (build, unit, traceability, audit)
  - `.github/workflows/ci-windows.yml`, Windows MSI E2E. Builds the fixture Runtime, verifies the MSI via `msiexec /a`, runs a headed smoke test via `tauri-driver` to confirm the canvas actually renders in the installed app
  - `.github/workflows/release.yml`, builds a KIT Apps MSI on `v*` tag push, attaches it to a draft GitHub release
- **Tests**: 94 unit + 9 e2e + traceability + audit, all green on Linux. Windows CI green on MSI build + smoke test.

### Changed

- Storage key (`gview_canvases_v2`) intentionally NOT migrated during the rename so existing local canvases survive the upgrade.

### Removed

- `cdn.tailwindcss.com` script. Tailwind is now compiled into the bundle via a built-in safelist that covers the common utility surface.
- `fileAssociations` field from `tauri.conf.json` (Tauri 1.5 schema rejects it; the WiX fragment already registers Windows file associations directly).
