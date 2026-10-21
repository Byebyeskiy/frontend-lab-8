export function genreStats(shows) {
  const map = new Map();
  for (const show of shows) for (const genre of new Set(show.genres ?? [])) {
    const entry = map.get(genre) ?? { genre, count: 0, sum: 0, rated: 0 };
    entry.count++;
    if (typeof show.rating === 'number' && Number.isFinite(show.rating)) {
      entry.sum += show.rating;
      entry.rated++;
    }
    map.set(genre, entry);
  }
  return [...map.values()].map(({ genre, count, sum, rated }) => ({
    genre, count, averageRating: rated ? Number((sum / rated).toFixed(2)) : null
  })).sort((a, b) => a.genre.localeCompare(b.genre, 'uk'));
}
