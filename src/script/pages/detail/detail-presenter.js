export default class DetailPresenter {
  #storyId;
  #view;
  #model;
  #dbModel;
  constructor(storyId, { view, model, dbModel }) {
    this.#storyId = storyId;
    this.#view = view;
    this.#model = model;
    this.#dbModel = dbModel;
  }

  getStoryDetail = async () => {
    try {
      const response = await this.#model.getStoryDetail(this.#storyId);
      if (!response.ok) {
        throw new Error(
          `Something went wrong: ${response.status} <<getStoryDetail failed << detail-presenter`,
        );
      } else {
        this.#view.renderDetailContent(response.data);
        if (response.data.lat && response.data.lon) {
          this.#view.renderMap({ lat: response.data.lat, lon: response.data.lon });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  saveStory = async () => {
    try {
      const story = await this.#model.getStoryDetail(this.#storyId);
      await this.#dbModel.putStory(story.data);
      alert('Story Saved Successfully');
    } catch (error) {
      console.error('saveReport: error:', error);
      alert('Story Saved Failed');
    }
  };

  removeSavedStory = async () => {
    try {
      await this.#dbModel.removeSavedStory(this.#storyId);
      alert('Story Removed Successfully');
      location.href = '/#/saved-story';
    } catch (error) {
      console.error('removeReport: error:', error);
    }
  };

  showSaveButton = async () => {
    if (await this.#isReportSaved()) {
      this.#view.renderRemoveButton();
      return;
    }

    this.#view.renderSaveButton();
  };

  #isReportSaved = async () => {
    return !!(await this.#dbModel.getStoryById(this.#storyId));
  };
}
