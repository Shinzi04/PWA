import StoryAPI from '../../data/api/story-api.js';
import HomePresenter from './home-presenter.js';
import TemplateRender from '../../template.js';

export default class HomePage {
  #presenter;

  render = async () => {
    return `
        <section class="@container/home">
            <div class="flex flex-col items-center sm:p-2 font-primary gap-4">
                <h2 class="font-bold font-sans text-5xl text-primary-text">Story List</h2>
                <p class="text-secondary-text text-center">Find your favorite stories and share your own</p>
                <div id="loading" class="hidden text-primary-text font-sans animate-bounce text-4xl">Loading . . .</div>
                <div id="story-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-5"></div>
            </div>
        </section>
        `;
  };

  afterRender = async () => {
    this.#presenter = new HomePresenter({ view: this, model: StoryAPI });
    await this.#presenter.getStories();
  };

  populateStories = (stories) => {
    const storyContainer = document.getElementById('story-container');
    storyContainer.innerHTML = '';
    stories.map((story) => {
      storyContainer.innerHTML += TemplateRender.generateStoryCard(story);
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
