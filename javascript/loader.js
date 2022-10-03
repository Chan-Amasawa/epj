export function showLoaderUi() {
  const loader = document.createElement("div");
  loader.classList.add("loader", "animate__animated", "animate__fadeIn");
  loader.innerHTML = `
      <div class=" min-vh-100 d-flex justify-content-center align-items-center fixed-top bg-white">
      <div class="spinner-border text-primary data-loader" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      </div>
    `;
  document.body.append(loader);
}

export function removeLoaderUi() {
  const selectCurrentLoader = document.querySelector(".loader");
  selectCurrentLoader.classList.replace("animate__fadeIn", "animate__fadeOut");
  selectCurrentLoader.addEventListener("animationend", () => {
    selectCurrentLoader.remove();
  });
}
