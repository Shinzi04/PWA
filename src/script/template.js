export default class TemplateRender {
  static generateStoryCard = ({ id, name, description, photoUrl, createdAt }) => {
    return `
    <article id="${id}" class="relative rounded-lg overflow-hidden shadow-lg group transition-transform duration-300">
			<a
					href="/#/detail/${id}"
					class="block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white transition duration-300"
					aria-label="View details for ${name}"
			>
        <img
					src="${photoUrl}"
					alt="${name} - ${description.slice(0, 50)}"
					class="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 flex flex-col justify-end gap-1.5">
        <div class="flex flex-col gap-0.5">
            <h3 class="text-white font-bold text-lg">${name}</h3>
            <p class="text-white text-sm">${description.slice(0, 50)}</p>
        </div>
        <div class="text-white text-xs">${new Date(createdAt).toDateString()}</div>
        </div>
    	</a>
    </article>
      `;
  };

  static generateSignInButton = () => {
    return `
        <button
            class="focus:bg-button-primary w-20 p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
            id="login"
            onclick="location.href='/#/login'"
        >
            Login
        </button>
        `;
  };

  static generateSignUpButton = () => {
    return `
      <button
          class="focus:bg-button-primary w-20 p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
          id="signup"
          onclick="location.href='/#/register'">
          Sign Up
      </button>
    `;
  };

  static generateAddStoryButton = () => {
    return `
      <button
          class="focus:bg-button-primary w-20 sm:w-auto p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
          id="add-story"
          onclick="location.href='/#/add-story'">
          <span class="font-bold">+</span> Add Story
      </button>
    `;
  };

  static generateLogoutButton = () => {
    return `
      <button
          class="focus:bg-button-primary w-20 p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
          id="log-out"
          onclick="location.href='/#/add'">
          Log Out
      </button>
    `;
  };

  static generateNotificationsContainer = () => {
    return `
      <div id="notifications-container"></div>
    `;
  };
  static generateSubscribeButton = () => {
    return `
      <button
          class="focus:bg-button-primary p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
          id="subscribe-button">
          Subscribe
      </button>
    `;
  };

  static generateUnsubscribeButton = () => {
    return `
      <button
          class="focus:bg-button-primary p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
          id="unsubscribe-button">
          Unsubscribe
      </button>
    `;
  };

  static generateSavedStoriesButton = () => {
    return `
      <button
          class="focus:bg-button-primary p-2 text-[0.75rem] sm:text-[1rem] rounded-md bg-slate-950 outline-1 outline-slate-900 text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out"
          id="saved-stories" onclick="location.href='/#/saved-story'">
          Saved Stories
      </button>
    `;
  };

  static generateStoryDetail = ({ id, name, description, photoUrl, createdAt }) => {
    return `
        <div class="flex flex-col sm:p-2 font-primary gap-4" id="story-container font-primary">
            <h2 class="font-bold text-5xl text-primary-text ">Story Detail</h2>
            <div class="flex items-center justify-between gap-2 text-secondary-text font-bold text-sm">
                <p>${name} • ${new Date(createdAt).toDateString()}</p>
                <p>${id}</p>
                </div>
            <img src="${photoUrl}" alt="${name} - ${description}" class="h-full max-h-[700px] rounded-[10px] object-contain group-hover:scale-105 transition-transform duration-500" />
            <div class="flex flex-col">
							<p class="text-primary-text text-xl md:text-2xl lg:text-3xl text-center">${description}</p>
						</div>
        </div>
    `;
  };

  static generateSaveButton = () => {
    return `
      <button class="p-2 rounded-md bg-slate-950 outline-1 outline-slate-900 font-primary text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out" 
      id="save-button">
          Save Story
        </button>
    `
  }

  static generateRemoveButton = () => {
    return `
      <button class="p-2 rounded-md bg-red-800 outline-1 outline-slate-900 font-primary text-primary-text font-bold hover:bg-text text-center select-none hover:cursor-pointer hover:bg-button-primary duration-300 ease-in-out" 
      id="remove-button">
          Remove Saved Story
        </button>
    `
  }
}
