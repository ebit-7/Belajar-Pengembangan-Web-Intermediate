// ✅ FILE: src/scripts/main.js
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

function initAddToHomeScreen() {
  if (localStorage.getItem('a2hs-installed') === 'true') return;

  let deferredPrompt;
  const installBtn = document.createElement('button');
  installBtn.textContent = 'Install Aplikasi';
  installBtn.style.display = 'none';
  installBtn.style.position = 'fixed';
  installBtn.style.bottom = '20px';
  installBtn.style.right = '20px';
  installBtn.style.zIndex = '1000';
  installBtn.style.padding = '10px 16px';
  installBtn.style.backgroundColor = '#4a90e2';
  installBtn.style.color = '#fff';
  installBtn.style.border = 'none';
  installBtn.style.borderRadius = '8px';
  installBtn.style.cursor = 'pointer';
  document.body.appendChild(installBtn);

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ User accepted A2HS prompt');
          localStorage.setItem('a2hs-installed', 'true');
        } else {
          console.log('❌ User dismissed A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  init();
  initSkipLink();
  startStoryPolling();
  initAddToHomeScreen();
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
