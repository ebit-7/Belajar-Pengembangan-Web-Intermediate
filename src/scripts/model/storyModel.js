import { getStories, addStory } from '../api/story-api.js';
import { idbStory } from '../idb.js';

export async function getAllStories() {
  return await getStories();
}

export async function postStory(data) {
  return await addStory(data);
}

// Untuk fitur cerita tersimpan
export async function saveStory(story) {
  return await idbStory.put(story);
}

export async function getSavedStories() {
  return await idbStory.getAll();
}

export async function deleteSavedStory(id) {
  return await idbStory.delete(id);
}

export async function isStorySaved(id) {
  const result = await idbStory.get(id);
  return !!result;
}
