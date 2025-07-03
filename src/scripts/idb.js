import { openDB } from 'idb';

const DB_NAME = 'story-app-db';
const STORE_NAME = 'stories';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

export const idbStory = {
  async put(story) {
    if (!story.id) throw new Error('Story harus memiliki ID.');
    const db = await dbPromise;
    return db.put(STORE_NAME, story);
  },

  async getAll() {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
  },

  async delete(id) {
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
  },

  async get(id) {
    const db = await dbPromise;
    return db.get(STORE_NAME, id);
  }
};
