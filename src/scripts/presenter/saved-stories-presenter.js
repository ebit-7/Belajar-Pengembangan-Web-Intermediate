import * as model from '../model/storyModel.js';
import * as view from '../view/saved-stories-view.js';

function setDependencies() {}

async function showSavedStories() {
  const stories = await model.getSavedStories();
  view.renderSavedStories(stories, async (idToDelete) => {
    await model.deleteSavedStory(idToDelete);
    showSavedStories(); // Refresh tampilan
  });
}

export default {
  setDependencies,
  showSavedStories,
};
