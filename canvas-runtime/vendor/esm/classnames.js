/*!
  Vendored offline copy of `classnames` (MIT, Jed Watson).
  Mirrors the public classnames@2.x algorithm so the canvas runtime can resolve
  `import classNames from 'classnames'` without an esm.sh round-trip. Exposed as
  an ES module (default + named) because the runtime loads external deps via
  dynamic import().
*/
const hasOwn = {}.hasOwnProperty;

function classNames(...args) {
  let classes = '';
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg) {
      classes = appendClass(classes, parseValue(arg));
    }
  }
  return classes;
}

function parseValue(arg) {
  if (typeof arg === 'string' || typeof arg === 'number') {
    return arg;
  }
  if (typeof arg !== 'object') {
    return '';
  }
  if (Array.isArray(arg)) {
    return classNames.apply(null, arg);
  }
  if (
    arg.toString !== Object.prototype.toString &&
    !arg.toString.toString().includes('[native code]')
  ) {
    return arg.toString();
  }
  let classes = '';
  for (const key in arg) {
    if (hasOwn.call(arg, key) && arg[key]) {
      classes = appendClass(classes, key);
    }
  }
  return classes;
}

function appendClass(value, newClass) {
  if (!newClass) {
    return value;
  }
  return value ? value + ' ' + newClass : newClass;
}

// Default export only: the runtime resolves a single-export module to its
// default (Object.keys(module).length === 1), which is what Babel's
// `import classNames from 'classnames'` interop expects. Adding a named export
// would make the runtime hand back the module namespace instead of the
// function, breaking `classNames(...)` calls.
export default classNames;
