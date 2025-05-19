import { getActiveRoute } from '../routes/url-parser.js';
import { USER_TOKEN, USER_NAME } from '../config.js';

export default class AuthHelper {
  static getUserToken = () => {
    try {
      const userToken = localStorage.getItem(USER_TOKEN);
      if (userToken === 'null' || userToken === 'undefined') {
        return null;
      }
      return userToken;
    } catch (error) {
      console.error('userToken: error:', error);
      return null;
    }
  };

  static setUserData = (token, name) => {
    try {
      localStorage.setItem(USER_TOKEN, token);
      localStorage.setItem(USER_NAME, name);
      return true;
    } catch (error) {
      console.error('putAccessToken: error:', error);
      return false;
    }
  };

  static removeUserToken = () => {
    try {
      localStorage.removeItem(USER_TOKEN);
      localStorage.removeItem(USER_NAME);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  static logOut = () => {
    this.removeUserToken();
    location.hash = '/login';
  };

  static checkAuthRoute = (page) => {
    const isLogin = !!this.getUserToken();
    if (!isLogin) {
      location.hash = '/login';
      location.reload();
      return null;
    }
    return page;
  };

  static checkUnauthRoute = (page) => {
    const unauthenticatedRoutesOnly = ['/login', '/register'];
    const url = getActiveRoute();
    const isLogin = !!this.getUserToken();

    if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
      location.hash = '/';
      setTimeout(() => {
        window.dispatchEvent(new Event('hashchange'));
      }, 0);
      return null;
    }
    return page;
  };

  static isLogin = () => !!this.getUserToken();
}
