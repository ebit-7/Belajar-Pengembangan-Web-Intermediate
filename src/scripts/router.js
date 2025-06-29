// scripts/router.js

import homePresenter from './presenter/home-presenter.js';
import addPresenter from './presenter/add-presenter.js';
import storyPresenter from './presenter/storyPresenter.js';
import savedStoriesPresenter from './presenter/saved-stories-presenter.js';

import { doLogin } from './presenter/login-presenter.js';
import { renderLoginPage } from '../pages/loginPage.js';
import { showRegisterPage } from '../pages/registerPage.js';

import { applyViewTransition } from './view-transition.js';
import { renderNavigation } from './view/navigation-view.js';

import * as storyModel from './model/storyModel.js';
import * as homeView from './view/home-view.js';
import * as addView from './view/add-view.js';
import * as storyView from './view/storyView.js';
import * as savedStoriesView from './view/saved-stories-view.js';

let isInjected = false;

/**
 * Inject dependencies only once.
 */
function injectDependencies() {
  if (isInjected) return;

  homePresenter.setDependencies({ modelModule: storyModel, viewModule: homeView });
  addPresenter.setDependencies({ modelModule: storyModel, viewModule: addView });
  storyPresenter.setDependencies({ modelModule: storyModel, viewModule: storyView });
  savedStoriesPresenter.setDependencies({ modelModule: storyModel, viewModule: savedStoriesView });

  isInjected = true;
}

/**
 * Main router function to handle view rendering based on URL hash.
 */
export function router() {
  const token = localStorage.getItem('token');
  const hash = window.location.hash || '#/home';
  const main = document.querySelector('main');

  if (!main) return;

  // Always update navigation bar
  renderNavigation();

  // Redirect to login if not authenticated and not on login/register page
  if (!token && hash !== '#/login' && hash !== '#/register') {
    window.location.hash = '#/login';
    return;
  }

  // Inject presenter dependencies once
  injectDependencies();

  // Route views based on hash
  switch (hash) {
    case '#/home':
    case '#/':
      applyViewTransition(() => {
        homePresenter.showHomePage();
        storyPresenter.showAllStories();
      });
      break;

    case '#/add':
      applyViewTransition(() => addPresenter.showAddForm());
      break;

    case '#saved-stories':
      applyViewTransition(() => savedStoriesPresenter.showSavedStories());
      break;

    case '#/login':
      applyViewTransition(() =>
        renderLoginPage({
          onSubmit: async ({ email, password }) => {
            const success = await doLogin({ email, password });
            if (success) window.location.hash = '#/home';
          },
        })
      );
      break;

    case '#/register':
      applyViewTransition(() => showRegisterPage());
      break;

    default:
      // Default fallback route to home page
      applyViewTransition(() => {
        homePresenter.showHomePage();
        storyPresenter.showAllStories();
      });
      break;
  }
}

/**
 * Stop camera stream (if any) on route change.
 */
window.addEventListener('hashchange', () => {
  const video = document.getElementById('camera');
  if (video?.srcObject) {
    video.srcObject.getTracks().forEach(track => track.stop());
  }
});
