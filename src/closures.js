export function createCounter(initial = 0) {
  let value = initial;
  return () => ++value;
}
export function once(fn) {
  let called = false, result;
  return function (...args) {
    if (!called) { result = fn.apply(this, args); called = true; }
    return result;
  };
}
export function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const value = fn.apply(this, args);
    cache.set(key, value);
    return value;
  };
}
