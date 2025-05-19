import RegisterPage from '../pages/auth/register/register-page.js';
import LoginPage from '../pages/auth/login/login-page.js';
import HomePage from '../pages/home/home-page.js';
import DetailPage from '../pages/detail/detail-page.js';
import AddStoryPage from '../pages/new/add-story-page.js';
import SavedStoryPage from '../pages/saved-story/saved-story-page.js';
import NotFoundPage from '../pages/notfound/notfound-page.js';
import AuthHelper from '../utils/auth.js';

export const routes = {
  '/login': () => AuthHelper.checkUnauthRoute(new LoginPage()),
  '/register': () => AuthHelper.checkUnauthRoute(new RegisterPage()),

  '/': () => AuthHelper.checkAuthRoute(new HomePage()),
  '/detail/:id': () => AuthHelper.checkAuthRoute(new DetailPage()),
  '/add-story': () => AuthHelper.checkAuthRoute(new AddStoryPage()),
  '/saved-story': () => AuthHelper.checkAuthRoute(new SavedStoryPage()),
  '*': () => new NotFoundPage(),
};
