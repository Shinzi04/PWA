export default class AddStoryPresenter {
  #view;
  #model;

  constructor({ view, model }) {
    this.#view = view;
    this.#model = model;
  }

  addStory = async ({ desc, photo, lat, lon }) => {
    try {
      const response = await this.#model.addStoryVerified(desc, photo, lat, lon);
      if (!response.ok) {
        throw new Error(
          `Something went wrong: ${response.status} << addStory failed << detail-presenter`,
        );
      } else {
        alert('Story Added Successfully');
        location.href = '/#/';
      }
    } catch (error) {
      console.error(error);
    }
  };
}
