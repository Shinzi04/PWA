export default class LoginPresenter {
  #view;
  #model;
  #helper;

  constructor({ view, model, helper }) {
    this.#view = view;
    this.#model = model;
    this.#helper = helper;
  }

  login = async ({ email, password }) => {
    this.#view.showLoading();
    try {
      const response = await this.#model.loginUser({ email, password });
      if (!response.ok) {
        this.#view.loginFailed(response.message);
        return;
      } else {
        this.#helper.setUserData(response.data.token, response.data.name);
        this.#view.loginSuccess(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.#view.hideLoading();
    }
  };
}
