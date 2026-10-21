export function normalizeShow(show = {}) {
  const s = show ?? {};
  return {
    id: s.id ?? null,
    name: s.name ?? 'Без назви',
    genres: Array.isArray(s.genres) ? [...s.genres] : [],
    rating: typeof s.rating?.average === 'number' ? s.rating.average : null,
    year: typeof s.premiered === 'string' && /^\d{4}/.test(s.premiered) ? Number(s.premiered.slice(0, 4)) : null,
    status: s.status ?? 'Unknown',
    image: s.image?.medium ?? s.image?.original ?? null,
    summary: typeof s.summary === 'string' ? s.summary.replace(/<[^>]*>/g, '') : ''
  };
}
