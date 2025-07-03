import { renderHomeMap } from './map-view.js';
import { saveStory, isStorySaved } from '../model/storyModel.js';

export async function renderHome(stories) {
  const main = document.getElementById('main-content');
  const nav = document.querySelector('nav');
  const footer = document.querySelector('footer');
  if (nav) nav.style.display = 'flex';
  if (footer) footer.style.display = 'block';

  if (!stories.length) {
    main.innerHTML = '<h2>Daftar Cerita</h2><p>Tidak ada cerita.</p>';
    return;
  }

  const storyCards = await Promise.all(stories.map(async story => {
    const saved = await isStorySaved(story.id);
    return `
  <div class="story-card" data-id="${story.id}">
    <img src="${story.photoUrl}" alt="${story.name}" loading="lazy" />
    <div class="story-info">
      <h3 class="story-title">${story.name}</h3>
      <p class="story-description">${story.description}</p>
      <small class="story-date">${new Date(story.createdAt).toLocaleString()}</small>
      <div class="story-actions">
        <button class="save-btn" data-id="${story.id}" ${saved ? 'disabled' : ''} aria-label="${saved ? 'Cerita sudah tersimpan' : 'Simpan cerita ini'}">
          ${saved ? '🔖 Tersimpan' : '💾 Simpan'}
        </button>
      </div>
    </div>
  </div>
`;

  }));

  main.innerHTML = `
    <h2>Daftar Cerita</h2>
    <div class="story-grid">${storyCards.join('')}</div>
    <div id="homeMap" style="height:400px; margin-top:2rem;"></div>
  `;

  renderHomeMap(stories);

  main.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', async e => {
      const id = e.target.dataset.id;
      const story = stories.find(s => s.id === id);
      if (!story) return alert('Cerita tidak ditemukan.');

      await saveStory(story);
      alert('Cerita berhasil disimpan!');
      e.target.disabled = true;
      e.target.innerText = '✔ Tersimpan';
    });
  });
}

export function renderError(msg) {
  const main = document.getElementById('main-content');
  main.innerHTML = `<p style="color:red;">${msg}</p>`;
}
