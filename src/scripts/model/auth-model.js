const BASE_URL = 'https://story-api.dicoding.dev/v1';

/**
 * Login ke API dan kembalikan hasil login.
 * @param {Object} param0
 * @param {string} param0.email
 * @param {string} param0.password
 * @returns {Promise<{token: string, name: string, userId: string}>}
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login gagal.');
  }

  return data.loginResult;
}

/**
 * Registrasi user ke API.
 * @param {Object} param0
 * @param {string} param0.name
 * @param {string} param0.email
 * @param {string} param0.password
 * @returns {Promise<Object>}
 */
export async function registerUser({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registrasi gagal.');
  }

  return data;
}

/**
 * Simpan token ke localStorage.
 * Harus dipanggil dari Presenter melalui Model, bukan langsung manipulasi localStorage.
 * @param {string} token
 */
export function saveToken(token) {
  localStorage.setItem('token', token);
}

/**
 * Ambil token dari localStorage.
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * Hapus token dari localStorage saat logout.
 */
export function clearToken() {
  localStorage.removeItem('token');
}
