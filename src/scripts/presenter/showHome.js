let model, view;

/**
 * Inisialisasi model dan view yang dibutuhkan presenter.
 */
function setDependencies({ modelModule, viewModule }) {
  model = modelModule;
  view = viewModule;
}

/**
 * Tampilkan halaman home dengan daftar cerita.
 */
async function showHome() {
  try {
    const stories = await model.getAllStories();
    view.renderHome(stories);
  } catch (error) {
    console.error('Gagal memuat cerita:', error);
    view.renderError('Gagal memuat data. Silakan coba lagi.');
  }
}

export default {
  setDependencies,
  showHome,
};
