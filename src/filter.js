export function filterShows(shows, { query = '', genre = '', minRating = null } = {}) {
  const q = String(query ?? '').trim().toLocaleLowerCase();
  const g = String(genre ?? '').trim().toLocaleLowerCase();
  return shows.filter(show =>
    String(show.name ?? '').toLocaleLowerCase().includes(q) &&
    (!g || (show.genres ?? []).some(item => item.toLocaleLowerCase() === g)) &&
    (minRating == null || (typeof show.rating === 'number' && show.rating >= Number(minRating)))
  );
}
