export default class RegisterPresenter {
  #view;
  #model;
  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  getRegisteredUser = async ({ name, email, password }) => {
    this.#view.showLoading();
    try {
      const response = await this.#model.registerUser({ name, email, password });
      if (!response.ok) {
        this.#view.registerFailed(response.message);
        return;
      } else {
        this.#view.registerSuccess(response.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.#view.hideLoading();
    }
  };
}
