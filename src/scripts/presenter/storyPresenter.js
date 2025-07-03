import * as model from '../model/storyModel.js';
import { idbStory } from '../idb.js';

let view;

function setDependencies({ viewModule }) {
  view = viewModule;
}

async function submitStory(formData) {
  try {
    view.showLoading(true);
    const result = await model.postStory(formData);
    view.showSuccess(result.message);

    if (view.navigateToHome) {
      view.navigateToHome();
    }
  } catch (error) {
    view.showError(error.message);
  } finally {
    view.showLoading(false);
  }
}

async function showAllStories() {
  try {
    const stories = await model.getAllStories();

    if (view.renderStoryList) {
      view.renderStoryList(stories, handleSaveStory);
    }

  } catch (err) {
    console.error('Gagal menampilkan cerita:', err.message);
    if (view.showError) {
      view.showError('Gagal memuat cerita.');
    }
  }
}

async function handleSaveStory(story) {
  try {
    await idbStory.put(story);
    alert(`Cerita "${story.name}" berhasil disimpan!`);
  } catch (err) {
    console.error('Gagal menyimpan story:', err.message);
  }
}

export default {
  setDependencies,
  submitStory,
  showAllStories,
};
