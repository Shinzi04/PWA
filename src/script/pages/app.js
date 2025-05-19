import '../../styles/output.css';
import { getActiveRoute } from '../routes/url-parser.js';
import { routes } from '../routes/routes.js';
import { transitionHelper } from '../utils/index.js';
import { isCurrentPushSubscriptionAvailable, subscribe, unsubscribe } from '../utils/notification-helper.js';
import { isServiceWorkerAvailable } from '../utils/index.js';
import AuthHelper from '../utils/auth.js';
import TemplateRender from '../template.js';
export default class App {
  #content;
  #navbarButton;

  constructor({ content, navbarButton }) {
    this.#content = content;
    this.#navbarButton = navbarButton;
  }
  async renderPage() {
    const url = getActiveRoute();
    const route = routes[url] || routes['*'];
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      },
    });
    transition.ready.catch(console.error);
    transition.updateCallbackDone.then(() => {
      scrollTo({ top: 0, behavior: 'smooth' });
      this.#updateNavbar();

      if(isServiceWorkerAvailable()){
        this.#setupNotificationButton();
      }
    });
  }

  #updateNavbar() {
    const isLogin = AuthHelper.isLogin();
    this.#navbarButton.innerHTML = '';
    if (isLogin) {
      this.#navbarButton.innerHTML += TemplateRender.generateNotificationsContainer();
      this.#navbarButton.innerHTML += TemplateRender.generateAddStoryButton();
      this.#navbarButton.innerHTML += TemplateRender.generateSavedStoriesButton();
      this.#navbarButton.innerHTML += TemplateRender.generateLogoutButton();
      const logoutButton = document.getElementById('log-out');
      logoutButton.addEventListener('click', () => {
        AuthHelper.logOut();
      });
    } else {
      this.#navbarButton.innerHTML += TemplateRender.generateSignInButton();
      this.#navbarButton.innerHTML += TemplateRender.generateSignUpButton();
    }
  }

  #setupNotificationButton = async () => {
    const notificationContainer = document.getElementById('notifications-container');
    const isSubscribed = await isCurrentPushSubscriptionAvailable();
    if(notificationContainer === null) return;
    if(isSubscribed){
      notificationContainer.innerHTML = TemplateRender.generateUnsubscribeButton();
      document.getElementById('unsubscribe-button').addEventListener('click', async () => {
        unsubscribe().finally(() => {
          this.#setupNotificationButton();
        })
      });
    }
    else{
      notificationContainer.innerHTML = TemplateRender.generateSubscribeButton();
      document.getElementById('subscribe-button').addEventListener('click', async () => {
        subscribe().finally(() => {
          this.#setupNotificationButton();
        })
      });
    }
  }
}
