// src/pages/homePage.js
import { showSavedStories } from '../scripts/presenter/idb-presenter.js';

/**
 * Render halaman home yang menampilkan cerita tersimpan dari IndexedDB
 */
export function renderHomePage() {
  const main = document.getElementById('main-content');
  if (!main) return;

  main.innerHTML = `
    <section>
      <h2 tabindex="0">Cerita Tersimpan</h2>
      <div id="saved-stories" aria-live="polite"></div>
    </section>
  `;

  showSavedStories(); // 🔁 Tampilkan cerita dari IndexedDB
}
