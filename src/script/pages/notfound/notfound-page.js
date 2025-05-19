export default class NotFoundPage {
  render() {
    return `
        <section class="@container/notfound">
            <div class="flex flex-col items-center sm:p-2 font-primary gap-4">
                <h2 class="font-bold font-sans text-5xl text-primary-text">Page Not Found</h2>
                 <button id="back-button" class="p-2 rounded-md bg-slate-950 text-primary-text font-bold hover:bg-button-primary duration-300" onclick="location.href='/#'">
                    Return To Home
                </button>
            </div>
        </section>
        `;
  }

  afterRender = () => {};
}
