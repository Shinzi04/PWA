export default class HomePresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  getStories = async () => {
    this.#view.showLoading();
    try {
      const response = await this.#model.getStories();
      if (!response.ok) {
        throw new Error(
          `Something went wrong: ${response.status} <<getStories failed << home-presenter`,
        );
      } else {
        this.#view.populateStories(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.#view.hideLoading();
    }
  };
}
