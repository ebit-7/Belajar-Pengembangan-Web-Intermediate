// scripts/presenter/login-presenter.js
import { requestPermission } from '../push-notification.js';
import * as model from '../model/auth-model.js';
import * as loginView from '../view/login-view.js';

/**
 * Fungsi untuk melakukan login.
 * @param {Object} param0
 * @param {string} param0.email
 * @param {string} param0.password
 * @returns {Promise<boolean>}
 */
export async function doLogin({ email, password }) {
  try {
    // Akses model untuk login
    const result = await model.loginUser({ email, password });

    // Simpan token menggunakan model
    model.saveToken(result.token);

    // Minta izin notifikasi
    requestPermission();

    // Tampilkan feedback ke pengguna
    loginView.showSuccess('Login berhasil!');

    // Arahkan ke halaman utama (gunakan method dari view)
    loginView.navigateToHome();

    return true;
  } catch (error) {
    // Tampilkan error lewat view
    loginView.showError(`Gagal login: ${error.message}`);
    return false;
  }
}
