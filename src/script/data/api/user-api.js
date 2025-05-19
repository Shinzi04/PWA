import { BASE_URL } from '../../config.js';
class AuthAPI {
  static registerUser = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const responseJSON = await response.json();
      return {
        ...responseJSON,
        ok: response.ok,
      };
    } catch (e) {
      console.error(e);
    }
  };

  static loginUser = async ({ email, password }) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const responseJSON = await response.json();
      return {
        data: responseJSON.loginResult,
        ok: response.ok,
      };
    } catch (e) {
      console.error(e);
    }
  };
}

export default AuthAPI;
