// src/scripts/presenter/idb-presenter.js
import { idbStory } from '../idb.js';
import { renderSavedStories } from '../view/saved-stories-view.js'; // ⬅️ destructure langsung

export async function showSavedStories() {
  const stories = await idbStory.getAll();
  renderSavedStories(stories, handleDeleteStory); // ⬅️ tidak perlu .render
}

async function handleDeleteStory(id) {
  await idbStory.delete(id);
  showSavedStories(); // refresh tampilan
}
