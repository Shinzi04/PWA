import RegisterPresenter from './register-presenter.js';
import AuthAPI from '../../../data/api/user-api.js';
export default class RegisterPage {
  #presenter = null;

  render = async () => {
    return `
    <section class="@container/register">
        <form
          class="flex flex-col w-80 sm:w-96  mx-auto mt-10 p-4 font-primary font-bold text-white bg-secondary rounded-md gap-3 border-[1px] border-border"
					id="register-form">
          <div class="flex flex-col items-center">
            <h2 class="font-bold text-2xl font-sans">Create Account</h2>
            <p class="text-secondary-text text-sm">Please fill in your details</p>
          </div>
          <div class="flex flex-col gap-1">
            <label for="name">Name</label>
            <input
              class="p-2 rounded-md bg-input-text focus:outline focus:outline-blue-600 placeholder:text-secondary-text"
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              required
            />
						
          </div>
          <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input
              class="p-2 rounded-md bg-input-text focus:outline focus:outline-blue-600 placeholder:text-secondary-text"
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              required
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="password">Password</label>
            <input
              class="p-2 rounded-md bg-input-text focus:outline focus:outline-blue-600 placeholder:text-secondary-text"
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              minlength="8"
              required
            />
            <p class="text-xs text-secondary-text">Password must be at least 8 characters</p>
          </div>
          <button
            class="p-2 rounded-md bg-button-primary disabled:bg-violet-900 disabled:cursor-not-allowed"
            type="submit"
            id="register-button"
          >
            Sign Up
          </button>
          <p class="text-center text-sm text-secondary-text">Already have an account? <a class="text-button-primary" href="#/login">Sign In</a></p>
        </form>
    </section>
        `;
  };

  afterRender = async () => {
    this.#presenter = new RegisterPresenter({ view: this, model: AuthAPI });
    this.#setupForm();
  };

  #setupForm = () => {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };
      this.#presenter.getRegisteredUser(data);
    });
  };

  registerSuccess = (message) => {
    location.hash = '/login';
  };

  registerFailed = (message) => {
    alert(`Register failed: ${message}`);
  };

  showLoading = () => {
    document.getElementById('register-button').textContent = 'Loading...';
    document.getElementById('register-button').disabled = true;
  };

  hideLoading = () => {
    document.getElementById('register-button').textContent = 'Sign Up';
    document.getElementById('register-button').disabled = false;
  };
}
