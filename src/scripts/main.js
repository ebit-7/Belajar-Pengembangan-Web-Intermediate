import '../assets/styles.css';
import { router } from './router.js';
import { renderNavigation } from './view/navigation-view.js';
import { initPush, showNotification } from './push-notification.js';
import { checkNewStories } from './api/story-api.js';

function updateView() {
  router();
  renderNavigation();
}

function init() {
  const token = localStorage.getItem('token');
  const hash = window.location.hash;
  const isAuthPage = hash === '#/login' || hash === '#/register';

  if (!token && !isAuthPage) {
    window.location.hash = '#/login';
  } else {
    updateView();
  }
}

function initSkipLink() {
  const mainContent = document.querySelector("#main-content");
  const skipLink = document.querySelector(".skip-link");

  if (mainContent && skipLink) {
    skipLink.addEventListener("click", function (event) {
      event.preventDefault();
      skipLink.blur();
      mainContent.setAttribute('tabindex', '-1');
      mainContent.focus();
      mainContent.scrollIntoView();
    });
  }
}

function startStoryPolling() {
  setInterval(async () => {
    try {
      const data = await checkNewStories();
      if (data && data.listStory?.length > 0) {
        showNotification('Ada cerita baru! 🎉');
      }
    } catch (e) {
      console.warn('❌ Gagal cek cerita baru:', e.message);
    }
  }, 60000);
}

window.addEventListener('DOMContentLoaded', () => {
  init();
  initSkipLink();
  startStoryPolling();
});

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('✅ Service Worker terdaftar!');
        initPush();
      })
      .catch((error) => {
        console.error('❌ Gagal mendaftarkan Service Worker:', error);
      });
  } else {
    console.warn('⚠️ Browser tidak mendukung Service Worker.');
  }
});

window.addEventListener('hashchange', updateView);
