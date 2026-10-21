import { normalizeShow } from './src/normalize.js';
import { filterShows } from './src/filter.js';
import { sortShows } from './src/sort.js';
import { genreStats } from './src/stats.js';
import { createCounter, once, memoize } from './src/closures.js';
const $ = id => document.getElementById(id);
const raw = await fetch('./data/shows.json').then(r => r.json());
const shows = raw.map(normalizeShow);
const genres = [...new Set(shows.flatMap(s => s.genres))].sort();
for (const genre of genres) $('genre').add(new Option(genre, genre));
function render() {
  const filtered = filterShows(shows, { query: $('query').value, genre: $('genre').value, minRating: $('rating').value === '' ? null : Number($('rating').value) });
  const sorted = sortShows(filtered, { by: $('sort').value, direction: $('direction').value });
  $('count').textContent = `Знайдено: ${sorted.length}`;
  $('shows').replaceChildren(...sorted.map(s => {
    const el = document.createElement('article'); el.className = 'item';
    const title = document.createElement('h3'); title.textContent = s.name;
    const meta = document.createElement('small'); meta.textContent = `${s.year ?? 'Рік невідомий'} · ${s.rating ?? 'Без оцінки'} · ${s.genres.join(', ') || 'Без жанру'}`;
    const description = document.createElement('p'); description.textContent = s.summary;
    el.append(title, meta, description); return el;
  }));
  $('stats').replaceChildren(...genreStats(filtered).map(s => {
    const tr = document.createElement('tr');
    for (const value of [s.genre, s.count, s.averageRating ?? '—']) {
      const td = document.createElement('td'); td.textContent = value; tr.append(td);
    } return tr;
  }));
}
for (const id of ['query', 'genre', 'rating', 'sort', 'direction']) $(id).addEventListener('input', render);
render();
const next = createCounter();
$('counter').addEventListener('click', () => $('counter').textContent = `Лічильник: ${next()}`);
const runOnce = once(() => 'Виконано лише один раз');
$('once').textContent = `once(): ${runOnce()} / ${runOnce()}`;
let calculations = 0; const square = memoize(x => { calculations++; return x * x; });
$('memo').textContent = `memoize(): square(5)=${square(5)}, повтор=${square(5)}, обчислень=${calculations}`;
