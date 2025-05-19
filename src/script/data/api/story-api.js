import { BASE_URL } from '../../config.js';
import AuthHelper from '../../utils/auth.js';

class StoryAPI {
  static addStoryVerified = async (desc, photo, latitute, longitude) => {
    try {
      const userToken = AuthHelper.getUserToken();
      if (userToken === 'null' || userToken === 'undefined') {
        throw new Error('USER NOT LOGIN');
      }
      const formData = new FormData();
      formData.set('description', desc);
      formData.set('photo', photo);
      formData.set('lat', latitute);
      formData.set('lon', longitude);

      const response = await fetch(`${BASE_URL}/stories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }
      const responseJSON = await response.json();

      return {
        data: responseJSON,
        ok: response.ok,
      };
    } catch (e) {
      console.error(e);
    }
  };

  //
  static addStoryGuest = async (desc, photo) => {
    try {
      const response = await fetch(`${BASE_URL}/stories/guest`, {
        method: 'POST',
        body: JSON.stringify({
          description: desc,
          photo: photo,
        }),
      });
      if (!response.ok) {
        throw new Error(`Something went wrong: ${response.status}`);
      }
      const responseJSON = await response.json();
      return responseJSON;
    } catch (e) {
      console.error(e);
    }
  };

  static getStories = async () => {
    try {
      const userToken = AuthHelper.getUserToken();
      const response = await fetch(`${BASE_URL}/stories?size=15`, {
        method: 'GET',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const responseJSON = await response.json();
      return {
        data: responseJSON.listStory,
        ok: response.ok,
      };
    } catch (e) {
      console.error(e);
    }
  };

  static getStoryDetail = async (id) => {
    try {
      const userToken = AuthHelper.getUserToken();
      const response = await fetch(`${BASE_URL}/stories/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
      });
      const responseJSON = await response.json();
      return {
        data: responseJSON.story,
        ok: response.ok,
      };
    } catch (e) {
      console.error(e);
    }
  };

  static unsubscribeToStoryNotification = async ({ endpoint }) => {
    try {
      const userToken = AuthHelper.getUserToken();
      const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: JSON.stringify({ endpoint }),
      });
      const responseJSON = response.json();
      return {
        responseJSON,
        ok: response.ok,
      };
    } catch (error) {
      console.error(error);
    }
  };

  static subscribeToStoryNotification = async ({endpoint, keys: {p256dh, auth }}) => {
    try {
      const userToken = AuthHelper.getUserToken();
      const data = JSON.stringify({ endpoint, keys: { p256dh, auth }});
      const response = await fetch(`${BASE_URL}/notifications/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`,
        },
        body: data,
      });
      const responseJSON = response.json();
      return {
        responseJSON,
        ok: response.ok,
      };
    } catch (error) {
      console.error(error);
    }
  };
}

export default StoryAPI;
