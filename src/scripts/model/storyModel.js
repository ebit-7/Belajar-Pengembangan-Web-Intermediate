import { idbStory } from '../idb.js';
import { getStories, addStory } from '../api/story-api.js';

export async function getAllStories() {
  return await getStories();
}

export async function postStory(data) {
  return await addStory(data); // ⬅️ Kirim ke API, bukan ke IndexedDB
}

export async function saveStory(story) {
  return await idbStory.put(story); // ⬅️ Simpan manual saat tombol simpan di-click
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
