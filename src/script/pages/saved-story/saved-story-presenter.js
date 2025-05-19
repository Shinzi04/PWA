export default class SavedStoryPresenter {
    #view;
    #model;

    constructor({ view, model }) {
        this.#view = view;
        this.#model = model;
    };

    getSavedStories = async () => {
        this.#view.showLoading();
        try {
            const stories = await this.#model.getAllSavedStories();
            console.log(stories)
            this.#view.populateSavedStories(stories);
        } catch (error) {
            console.error(error);
        } finally {
            this.#view.hideLoading();
        }
    }


}