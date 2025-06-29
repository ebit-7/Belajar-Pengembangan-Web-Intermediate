export function createLoadingElement() {
  const loading = document.createElement('div');
  loading.id = 'loading';
  loading.style.display = 'none';
  loading.setAttribute('aria-live', 'polite');
  loading.setAttribute('role', 'status');
  loading.setAttribute('aria-busy', 'true');
  loading.textContent = 'Mengirim...';
  return loading;
}
