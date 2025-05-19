import AuthHelper from '../../../utils/auth.js';
import AuthAPI from '../../../data/api/user-api.js';
import LoginPresenter from './login-presenter.js';

export default class LoginPage {
  #presenter = null;
  render = async () => {
    return `
    <section class="@container/register" id="login-container">
        <form
          class="flex flex-col w-80 sm:w-96  mx-auto mt-10 p-4 font-primary font-bold text-white bg-secondary rounded-md gap-3 border-[1px] border-border"
					id="login-form">
          <div class="flex flex-col items-center">
            <h2 class="font-bold text-2xl font-sans">Sign In</h2>
            <p class="text-secondary-text text-sm">Enter your credentials to access your account</p>
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
            id="login-button"
          >
            Login
          </button>
          <p class="text-center text-sm text-secondary-text">Don't have an account? <a class="text-button-primary" href="#/register">Sign Up</a></p>
        </form>
    </section>
        `;
  };

  afterRender = async () => {
    this.#presenter = new LoginPresenter({ view: this, model: AuthAPI, helper: AuthHelper });
    this.#setupForm();
  };

  #setupForm = () => {
    document.getElementById('login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };
      await this.#presenter.login(data);
    });
  };

  loginSuccess = (message) => {
    location.href = '/';
  };

  loginFailed = (message) => {
    alert(`Login Failed: ${message}`);
  };

  showLoading = () => {
    document.getElementById('login-button').textContent = 'Loading...';
    document.getElementById('login-button').disabled = true;
  };

  hideLoading = () => {
    document.getElementById('login-button').textContent = 'Login';
    document.getElementById('login-button').disabled = false;
  };
}
