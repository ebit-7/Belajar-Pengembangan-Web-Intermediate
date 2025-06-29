// presenter/saved-stories-presenter.js
let model, view;

function setDependencies({ modelModule, viewModule }) {
  model = modelModule;
  view = viewModule;
}

async function showSavedStories() {
  const stories = await model.getSavedStories();

  view.render(stories, async (idToDelete) => {
    await model.deleteSavedStory(idToDelete);
    showSavedStories(); // render ulang setelah hapus
  });
}

export default {
  setDependencies,
  showSavedStories,
};
