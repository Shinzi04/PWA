import AddStoryPresenter from './add-story.presenter';
import StoryAPI from '../../data/api/story-api.js';
import Map from '../../utils/map.js';
import Camera from '../../utils/camera.js';
import { convertBase64ToBlob } from '../../utils/converter.js';

export default class AddStoryPage {
  #presenter;
  #map;
  #form;
  #camera;
  #capturedImage;

  render = async () => {
    return `
      <section class="@container/new-story-form flex flex-col max-w-[768px] mx-auto gap-2"> 
        <button id="back-button" class="w-20 p-2 rounded-md bg-slate-950 text-primary-text font-bold hover:bg-button-primary duration-300" onclick="location.href='/#'">
          < Back
        </button>
        <form id="register-form" class="flex flex-col w-full mx-auto p-2 sm:p-4 bg-secondary text-white rounded-md gap-3 border border-border font-primary font-bold">
          <div class="text-center">
            <h2 class="text-2xl font-sans font-bold">New Story</h2>
            <p class="text-secondary-text text-sm">Please fill in your details</p>
          </div>

          <div class="flex flex-col gap-1">
            <label for="story-description">Story Description</label>
            <textarea id="story-description" name="story-description" required
              class="p-2 bg-input-text rounded-md placeholder:text-secondary-text resize-none focus:outline focus:outline-blue-600"
              placeholder="Share your story..."></textarea>
          </div>

          <div class="flex flex-col gap-2">
            <div for="story-image">Story Image</div>
            <div class="flex gap-2 justify-center">
              <button type="button" id="open-camera-button" class="bg-button-primary p-2 rounded-md">Open Camera</button>
              <button type="button" id="capture-button" class="bg-button-primary p-2 rounded-md">Capture</button>
              <input type="file" id="video-input" accept="image/*" hidden />
            </div>
            <video id="camera-video" class="hidden h-60 rounded-md" autoplay></video>
            <canvas id="camera-canvas" hidden></canvas>
            <img id="image-preview" class="hidden w-full h-60 rounded-md object-contain mt-2" />
            <div class="flex justify-center">
              <select id="camera-select" class=" hidden bg-button-primary p-2 rounded-md" ></select>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <div>Story Location</div>
            <div id="map" class="w-full h-60"></div>
            <div class="flex gap-2">
              <div class="w-1/2">
                <label for="lat">Latitude :</label>
                <input type="number" disabled id="lat" name="lat" class="bg-input-text sticky w-full" step="any" value="0.00" />
              </div>
              <div class="w-1/2">
                <label for="lon">Longitude :</label>
                <input type="number" disabled id="lon" name="lon" class="bg-input-text w-full" step="any" value="0.00" />
              </div>
            </div>
          </div>

          <button type="submit" id="register-button"
            class="p-2 bg-button-primary rounded-md disabled:bg-violet-900 disabled:cursor-not-allowed">
            Add Story
          </button>
          <p class="text-center text-sm text-secondary-text">Add your Story :)</p>
        </form>
      </section>
    `;
  };

  afterRender = async () => {
    this.#presenter = new AddStoryPresenter({ view: this, model: StoryAPI });

    this.#form = document.getElementById('register-form');
    this.#setupForm();
    await this.#setupMap();
    await this.#setupCamera();
  };

  #setupCamera = async () => {
    const video = document.getElementById('camera-video');
    const preview = document.getElementById('image-preview');
    const cameraSelect = document.getElementById('camera-select');
    const cameraCanvas = document.getElementById('camera-canvas');

    this.#camera = new Camera({
      video,
      cameraSelect: cameraSelect,
      canvas: cameraCanvas,
    });

    document.getElementById('open-camera-button').addEventListener('click', () => {
      this.#camera.launch();
      video.style.display = 'block';
      preview.style.display = 'none';
      cameraSelect.style.display = 'block';
    });

    this.#camera.addCheeseButtonListener('#capture-button', async () => {
      const image = await this.#camera.takePicture();
      await this.#handleCapturedImage(image);

      this.#camera.stop();

      video.style.display = 'none';
      preview.style.display = 'block';
    });

    document.getElementById('video-input').addEventListener('change', async (event) => {
      const file = event.target.files[0];
      if (file) {
        this.#capturedImage = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          blob: file,
        };

        const url = URL.createObjectURL(file);
        preview.src = url;
        video.style.display = 'none';
        preview.style.display = 'block';
      }
    });

    window.addEventListener('beforeunload', () => {
      this.#camera.stop();
    });
  };

  #handleCapturedImage = async (image) => {
    const preview = document.getElementById('image-preview');

    let blob = image;
    if (typeof image === 'string') {
      blob = await convertBase64ToBlob(image, 'image/png');
    }

    this.#capturedImage = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      blob,
    };

    const url = URL.createObjectURL(blob);
    preview.src = url;
  };

  #setupMap = async () => {
    this.#map = await Map.createMap('#map', { zoom: 10, locate: true });

    const centerCoordinate = this.#map.getCenter();
    this.#updateLatLonInput(centerCoordinate.latitude, centerCoordinate.longitude);

    const dragableMarker = this.#map.addMarker([centerCoordinate.lat, centerCoordinate.lon], {
      draggable: true,
    });
    dragableMarker.addEventListener('move', (event) => {
      const coordinate = event.target.getLatLng();
      this.#updateLatLonInput(coordinate.lat, coordinate.lng);
    });

    this.#map.addMapEventListener('click', (event) => {
      dragableMarker.setLatLng(event.latlng);
      event.sourceTarget.flyTo(event.latlng);
    });
  };

  #updateLatLonInput = (lat, lon) => {
    this.#form.elements.namedItem('lat').value = lat;
    this.#form.elements.namedItem('lon').value = lon;
  };

  #setupForm = () => {
    this.#form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (this.#capturedImage === undefined) {
        alert('Please Take a Picture First');
        return;
      } else {
        const data = {
          desc: this.#form.elements.namedItem('story-description').value,
          photo: this.#capturedImage.blob,
          lat: this.#form.elements.namedItem('lat').value,
          lon: this.#form.elements.namedItem('lon').value,
        };
        await this.#presenter.addStory(data);
      }
    });
  };
}
