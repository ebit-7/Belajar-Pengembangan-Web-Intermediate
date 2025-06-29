// scripts/view/login-view.js

// Navigasi ke halaman home
export function navigateToHome() {
  window.location.hash = '#/home';
}

// Tampilkan notifikasi sukses
export function showSuccess(message) {
  alert(`✅ ${message}`);
}

// Tampilkan notifikasi error
export function showError(message) {
  alert(`❌ ${message}`);
}

// Render form login
export function renderLoginForm({ onSubmit }) {
  const container = document.querySelector('main');

  container.innerHTML = `
    <form id="login-form">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      showError("Email dan password wajib diisi.");
      return;
    }

    onSubmit({ email, password });
  });
}
