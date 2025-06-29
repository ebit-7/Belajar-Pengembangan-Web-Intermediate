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

  const storyListHTML = await Promise.all(stories.map(async (story) => {
    const saved = await isStorySaved(story.id);
    const buttonText = saved ? 'Tersimpan' : 'Simpan';
    const disabledAttr = saved ? 'disabled' : '';

    return `
      <div class="story-card" data-id="${story.id}">
        <img src="${story.photoUrl}" alt="Foto oleh ${story.name}" loading="lazy" />
        <div class="story-info">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
          <button class="save-btn" data-id="${story.id}" ${disabledAttr}>${buttonText}</button>
        </div>
      </div>
    `;
  }));

  main.innerHTML = `
    <h2>Daftar Cerita</h2>
    <div class="story-grid">${storyListHTML.join('')}</div>
    <div id="homeMap" style="height: 400px; margin-top: 2rem;"></div>
  `;

  renderHomeMap(stories);

  main.querySelectorAll('.save-btn').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      const story = stories.find(s => s.id === id);
      if (!story) return alert('Story tidak ditemukan.');

      try {
        await saveStory(story);
        alert('Cerita berhasil disimpan!');
        e.target.disabled = true;
        e.target.textContent = 'Tersimpan';
      } catch (error) {
        alert('Gagal menyimpan cerita: ' + error.message);
      }
    });
  });
}
