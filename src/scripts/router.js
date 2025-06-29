// scripts/router.js
import homePresenter from './presenter/home-presenter.js';
import addPresenter from './presenter/add-presenter.js';
import storyPresenter from './presenter/storyPresenter.js';
import { doLogin } from './presenter/login-presenter.js';
import { renderLoginPage } from '../pages/loginPage.js';
import { showRegisterPage } from '../pages/registerPage.js';
import { applyViewTransition } from './view-transition.js';

import * as storyModel from './model/storyModel.js';
import * as homeView from './view/home-view.js';
import * as addView from './view/add-view.js';
import * as storyView from './view/storyView.js'; // ✅ Tambahkan ini

let isInjected = false;

function injectDependencies() {
  if (isInjected) return;

  homePresenter.setDependencies({
    modelModule: storyModel,
    viewModule: homeView,
  });

  addPresenter.setDependencies({
    modelModule: storyModel,
    viewModule: addView,
  });

  storyPresenter.setDependencies({
    modelModule: storyModel,
    viewModule: storyView, // ✅ FIX: inject view di sini
  });

  isInjected = true;
}

export function router() {
  const token = localStorage.getItem('token');
  const hash = window.location.hash || '#/home';
  const main = document.querySelector('main');
  if (!main) return;

  if (!token && hash !== '#/login' && hash !== '#/register') {
    window.location.hash = '#/login';
    return;
  }

  injectDependencies();

  switch (hash) {
    case '#/home':
    case '#/':
      applyViewTransition(() => {
        homePresenter.showHomePage();
        storyPresenter.showAllStories(); // ✅ Aman karena sudah inject view
      });
      break;

    case '#/add':
      applyViewTransition(() => addPresenter.showAddForm());
      break;

    case '#/login':
      applyViewTransition(() =>
        renderLoginPage({
          onSubmit: async ({ email, password }) => {
            const success = await doLogin({ email, password });
            if (success) {
              window.location.hash = '#/home';
            }
          },
        })
      );
      break;

    case '#/register':
      applyViewTransition(() => showRegisterPage());
      break;

    default:
      applyViewTransition(() => {
        homePresenter.showHomePage();
        storyPresenter.showAllStories();
      });
      break;
  }
}

// ✅ Tambahkan event listener untuk stop kamera saat pindah halaman
window.addEventListener('hashchange', () => {
  const video = document.getElementById('camera');
  if (video && video.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
  }
});
