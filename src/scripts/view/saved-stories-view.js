export function render(stories, onDelete) {
  const main = document.querySelector('main');
  main.innerHTML = '<h2>Cerita Tersimpan</h2><div class="story-grid" id="saved-stories"></div>';

  const container = document.getElementById('saved-stories');
  if (!stories.length) {
    container.innerHTML = '<p>Tidak ada cerita tersimpan.</p>';
    return;
  }

  stories.forEach((story) => {
    const card = document.createElement('div');
    card.className = 'story-card';

    card.innerHTML = `
      <img src="${story.photoUrl || ''}" alt="Foto oleh ${story.name || 'Unknown'}" loading="lazy" />
      <div class="story-info">
        <h3>${story.name || 'Tanpa Nama'}</h3>
        <p>${story.description || 'Tanpa Deskripsi'}</p>
        <small>${new Date(story.createdAt || Date.now()).toLocaleString()}</small>
        <button class="delete-btn" data-id="${story.id}" aria-label="Hapus cerita ${story.name || ''}">Hapus</button>
      </div>
    `;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin menghapus cerita ini?')) {
        onDelete(story.id); // Ini akan trigger refresh
      }
    });

    container.appendChild(card);
  });
}
