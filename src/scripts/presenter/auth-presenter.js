import { loginUser, registerUser, saveToken } from '../model/auth-model.js';
import * as loginView from '../view/login-view.js';
import * as registerView from '../view/register-view.js';

export function showLogin() {
  loginView.renderLoginForm({
    onSubmit: async ({ email, password }) => {
      try {
        const { token } = await loginUser({ email, password });
        saveToken(token);
        loginView.showSuccess('Login berhasil!');
        loginView.navigateToHome(); // ➕
      } catch (err) {
        loginView.showError(err.message);
      }
    }
  });
}

export function showRegister() {
  registerView.renderRegisterForm({
    onSubmit: async ({ name, email, password }) => {
      try {
        await registerUser({ name, email, password });
        registerView.showSuccess('Registrasi berhasil! Silakan login.');
        registerView.navigateToLogin(); // ➕
      } catch (err) {
        registerView.showError(err.message);
      }
    }
  });
}
