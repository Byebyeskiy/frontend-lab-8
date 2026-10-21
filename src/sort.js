export function sortShows(shows, { by = 'name', direction = 'asc' } = {}) {
  const sign = direction === 'desc' ? -1 : 1;
  return [...shows].sort((a, b) => {
    const x = a[by] ?? null, y = b[by] ?? null;
    if (x == null && y == null) return 0;
    if (x == null) return 1;
    if (y == null) return -1;
    const cmp = by === 'name' ? String(x).localeCompare(String(y), 'uk') : Number(x) - Number(y);
    return cmp * sign;
  });
}
