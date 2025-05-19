import App from './pages/app.js';
import 'leaflet/dist/leaflet.css';
import Camera from './utils/camera.js';
import { registerServiceWorker } from './utils/index.js';
 
document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    navbarButton: document.getElementById('navbar-button'),
  });
  await app.renderPage();
  await registerServiceWorker();
  window.addEventListener('hashchange', async () => {
    await app.renderPage();
    Camera.stopAllStream();
  });
});