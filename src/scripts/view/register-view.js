// Navigasi ke halaman login
export function navigateToLogin() {
  window.location.hash = '#/login';
}

// Tampilkan notifikasi sukses
export function showSuccess(message) {
  alert(`✅ ${message}`);
}

// Tampilkan notifikasi error
export function showError(message) {
  alert(`❌ ${message}`);
}

// Render form registrasi
export function renderRegisterForm({ onSubmit }) {
  const container = document.querySelector('main');

  container.innerHTML = `
    <form id="register-form">
      <h2>Register</h2>
      <input type="text" id="name" placeholder="Nama Lengkap" required />
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Daftar</button>
    </form>
  `;

  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!name || !email || !password) {
      showError("Semua field wajib diisi.");
      return;
    }

    onSubmit({ name, email, password });
  });
}
