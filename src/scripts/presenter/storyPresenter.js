import * as model from '../model/storyModel.js';

let view;

function setDependencies({ viewModule }) {
  view = viewModule;
}

async function submitStory(formData) {
  try {
    view.showLoading(true);

    const result = await model.postStory(formData);
    view.showSuccess(result.message);

    // Navigasi ke halaman home jika pengiriman berhasil
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
      view.renderStoryList(stories);
    }

  } catch (err) {
    console.error('Gagal menampilkan cerita:', err.message);
    if (view.showError) {
      view.showError('Gagal memuat cerita.');
    }
  }
}

export default {
  setDependencies,
  submitStory,
  showAllStories,
};
