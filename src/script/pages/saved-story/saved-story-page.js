import TemplateRender from '../../template';
import SavedStoryPresenter from './saved-story-presenter';
import Database from '../../data/database';
export default class SavedStoryPage {
  #presenter;
  render = async () => {
    return `
        <section class="@container/saved-story">
					<button class="w-20 p-2 rounded-md bg-slate-950 outline-1 outline-slate-900 font-primary text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out" id="back-button"onclick="location.href='/#'">
						< Back
					</button>
            <div class="flex flex-col items-center sm:p-2 font-primary gap-4">
                <h2 class="font-bold font-sans text-5xl text-primary-text">Saved Story List</h2>
                <p class="text-secondary-text text-center">Here is your saved stories</p>
                <div id="loading" class="hidden text-primary-text font-sans animate-bounce text-4xl">Loading . . .</div>
                <div id="saved-story-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-5"></div>
            </div>
        </section>
        `;
  };

  afterRender = async () => {
    this.#presenter = new SavedStoryPresenter({ view: this, model: Database });
		await this.#presenter.getSavedStories();
  };

  populateSavedStories = (stories) => {
    const savedStoryContainer = document.getElementById('saved-story-container');
    savedStoryContainer.innerHTML = '';
    stories.map((story) => {
      savedStoryContainer.innerHTML += TemplateRender.generateStoryCard(story);
    });
  };

  showLoading = () => {
    const loading = document.getElementById('loading');
    loading.classList.remove('hidden');
  };

  hideLoading = () => {
    const loading = document.getElementById('loading');
    loading.classList.add('hidden');
  };
}
