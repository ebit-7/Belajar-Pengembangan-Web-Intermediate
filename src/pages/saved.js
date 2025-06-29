// src/scripts/pages/saved.js
import { idbStory } from '../idb.js';

const savedTemplate = () => `
  <section id="saved-stories">
    <h2>Saved Stories</h2>
    <div id="stories-list"></div>
  </section>
`;

class SavedPage {
  constructor() {
    this.container = null;
  }

  async render() {
    this.container = document.createElement('div');
    this.container.innerHTML = savedTemplate();

    await this.loadSavedStories();

    return this.container;
  }

  async loadSavedStories() {
    const storiesList = this.container.querySelector('#stories-list');
    storiesList.innerHTML = '<p>Loading...</p>';

    try {
      const stories = await idbStory.getAll();
      if (stories.length === 0) {
        storiesList.innerHTML = '<p>No saved stories found.</p>';
        return;
      }

      storiesList.innerHTML = stories
        .map(story => `
          <article class="story-item">
            <h3>${story.title}</h3>
            <p>${story.content}</p>
          </article>
        `)
        .join('');
    } catch (error) {
      storiesList.innerHTML = `<p>Error loading saved stories: ${error.message}</p>`;
    }
  }
}

export default SavedPage;
