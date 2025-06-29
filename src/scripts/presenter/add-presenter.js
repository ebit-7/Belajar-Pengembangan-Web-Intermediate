let model, view;

function setDependencies({ modelModule, viewModule }) {
  model = modelModule;
  view = viewModule;
}

async function handleSubmit({ description, photo, lat, lon }) {
  if (!description || !photo || !lat || !lon) {
    view.showError('Pastikan semua data lengkap!');
    return;
  }

  try {
    view.showLoading(true);
    const result = await model.postStory({ description, photo, lat, lon });
    view.showSuccess(result.message);
    view.navigateToHome(); // ➕ tanggung jawab navigasi pindah ke View
  } catch (error) {
    view.showError(error.message || 'Terjadi kesalahan saat mengirim data');
  } finally {
    view.showLoading(false);
  }
}

function showAddForm() {
  view.renderAddForm({ onSubmit: handleSubmit });
}

export default {
  setDependencies,
  showAddForm,
};
