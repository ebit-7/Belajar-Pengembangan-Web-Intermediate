/**
 * Render daftar cerita tersimpan dari IndexedDB ke DOM.
 * @param {Array} stories - Daftar story yang disimpan
 * @param {Function} onDelete - Fungsi callback ketika tombol hapus diklik
 */
export function renderSavedStories(stories, onDelete) {
  const container = document.getElementById('saved-stories');
  if (!container) return;

  container.innerHTML = '';

  if (!stories || stories.length === 0) {
    container.innerHTML = '<p>Tidak ada cerita tersimpan.</p>';
    return;
  }

  stories.forEach((story) => {
    if (!story.id) return; // abaikan yang tidak valid

    const card = document.createElement('div');
    card.classList.add('story-card');

    card.innerHTML = `
      <h3>${story.name || 'Tanpa Nama'}</h3>
      <p>${story.description || 'Tanpa Deskripsi'}</p>
      <p><small>${new Date(story.createdAt || Date.now()).toLocaleDateString()}</small></p>
      <button class="delete-btn" data-id="${story.id}" aria-label="Hapus cerita ${story.name || ''}">Hapus</button>
    `;

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin menghapus cerita ini?')) {
        onDelete(story.id);
      }
    });

    container.appendChild(card);
  });
}
