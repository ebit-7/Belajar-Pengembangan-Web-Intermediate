// src/scripts/presenter/idb-presenter.js
import { idbStory } from '../model/idb.js';
import * as savedStoriesView from '../view/saved-stories-view.js';

export async function showSavedStories() {
  const stories = await idbStory.getAll();
  savedStoriesView.renderSavedStories(stories, handleDeleteStory);
}

async function handleDeleteStory(id) {
  await idbStory.delete(id);
  showSavedStories(); // refresh view setelah delete
}
