// ✅ FILE: src/scripts/presenter/home-presenter.js
let model, view;

function setDependencies({ modelModule, viewModule }) {
  model = modelModule;
  view = viewModule;
}

async function showHomePage() {
  try {
    const stories = await model.getAllStories(); // Gunakan dari model
    view.renderHome(stories); // ✅ pastikan ini ada di view
  } catch (error) {
    const cached = await model.getSavedStories();
    if (cached.length > 0) {
      view.renderHome(cached);
    } else {
      view.renderError('Tidak ada data yang tersedia.');
    }
  }
}

export default {
  setDependencies,
  showHomePage,
};
