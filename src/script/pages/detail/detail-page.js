import StoryAPI from '../../data/api/story-api';
import DetailPresenter from './detail-presenter';
import TemplateRender from '../../template';

import Database from '../../data/database';
import { parseActivePathname } from '../../routes/url-parser';

import Map from '../../utils/map';

export default class DetailPage {
  #presenter = null;
  #map;
  render = async () => {
    return `
      <section class="@container/detail flex flex-col max-w-[1024px] mx-auto">
        <div class="flex justify-between items-center">
        <button class="w-20 p-2 rounded-md bg-slate-950 outline-1 outline-slate-900 font-primary text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out" id="back-button"onclick="location.href='/#'">
          < Back
        </button>
        <div id='save-container'></div>
        </div>
        <section class="@container/detail mt-4" id="detail-container">
        </section>
        <section class="@container/map mt-4 flex flex-col justify-center items-center hidden" id="map-container">
          <h2 class="font-bold font-primary text-3xl text-primary-text">Location</h2>
          <div id="map" class="h-[200px] md:h-[500px] w-full md:w-[90%] bg-amber-300"></div>
        </section>
      </section">
        `;
  };
  afterRender = async () => {
    this.#presenter = new DetailPresenter(parseActivePathname().id, {
      view: this,
      model: StoryAPI,
      dbModel: Database,
    });
    await this.#presenter.getStoryDetail();
    this.#presenter.showSaveButton();
  };
  renderDetailContent = (details) => {
    const detailContainer = document.getElementById('detail-container');
    detailContainer.innerHTML = '';
    detailContainer.innerHTML += TemplateRender.generateStoryDetail(details);
  };

  renderMap = async ({ lat, lon }) => {
    const mapContainer = document.getElementById('map-container');
    mapContainer.classList.remove('hidden');
    this.#map = await Map.createMap('#map', {
      zoom: 15,
    });
    this.#map.changeCamera([lat, lon]);
    this.#map.addMarker([lat, lon], { alt: 'Story' }, { content: 'Story Location' });
  };

  renderSaveButton = () => {
    const saveContainer = document.getElementById('save-container');
    saveContainer.innerHTML = TemplateRender.generateSaveButton();

    document.getElementById('save-button').addEventListener('click', async () => {
      await this.#presenter.saveStory();
      this.#presenter.showSaveButton();
    });
  };

  renderRemoveButton = () => {
    const saveContainer = document.getElementById('save-container');
    saveContainer.innerHTML = TemplateRender.generateRemoveButton();

    document.getElementById('remove-button').addEventListener('click', async () => {
      await this.#presenter.removeSavedStory();
      this.#presenter.showSaveButton();
    });
  };
}
