export function renderStoryList(stories, onSave) {
  const container = document.getElementById('stories-container');
  if (!container) return;

  container.innerHTML = '';

  stories.forEach(story => {
    if (!story.id) return;

    const div = document.createElement('div');
    div.className = 'story-item';
    div.innerHTML = `
      <p>${story.description || 'No description'}</p>
      <small>${new Date(story.createdAt || Date.now()).toLocaleString()}</small>
      <button class="save-btn" data-id="${story.id}">Simpan Story</button>
    `;

    const saveBtn = div.querySelector('.save-btn');
    if (saveBtn && typeof onSave === 'function') {
      saveBtn.addEventListener('click', () => onSave(story));
    }

    container.appendChild(div);
  });
}
