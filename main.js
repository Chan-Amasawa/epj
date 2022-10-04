import { showLoaderUi, removeLoaderUi } from "./javascript/loader.js";
import "./style.scss";

let items = [];
let itemRow = document.querySelector(".item-row");
let cartBtn = document.querySelector(".cart-btn");

showLoaderUi();
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    items = json;
    items.forEach((item) => {
      console.log(item);
      let itemDiv = document.createElement("div");
      itemDiv.classList.add("col-md-6", "col-lg-4");
      itemDiv.innerHTML = `
        <div class="card item-card">
          <div class="card-body d-flex flex-column">
            <div class="mb-3">
              <img src="${item.image}" class="item-img" alt="">
            </div>
            <div class="card-title fw-bold text-truncate">
              ${item.title}
            </div>
            <div class="card-text small mb-3">
              ${item.description.substring(0, 100)}
            </div>

            <div class="d-flex justify-content-between align-items-center mt-auto">
              <p class="fw-bold mb-0">$ <span>100</span></p>
              <button class="btn btn-outline-primary add-cart">
                <i class="bi bi-cart-plus pe-none"></i> Add Cart
              </button>
            </div>
          </div>
        </div>
      `;
      itemRow.append(itemDiv);
    });
    console.log(json);
    removeLoaderUi();
  });

itemRow.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-cart")) {
    let btnParent = e.target.closest(".item-card");
    let parentImg = btnParent.querySelector(".item-img");
    console.log(parentImg);

    let newImage = new Image();
    newImage.src = parentImg.src;
    newImage.style.position = "fixed";
    newImage.style.height = 100 + "px";
    newImage.style.zIndex = 2000;
    newImage.style.transition = 1 + "s";
    newImage.style.top = parentImg.getBoundingClientRect().top + "px";
    newImage.style.left = parentImg.getBoundingClientRect().left + "px";
    console.log(newImage);
    document.body.append(newImage);

    setTimeout(() => {
      newImage.style.transform = "rotate(360deg)";
      newImage.style.height = 0 + "px";
      newImage.style.top =
        cartBtn.querySelector(".bi").getBoundingClientRect().top + "px";
      newImage.style.left =
        cartBtn.querySelector(".bi").getBoundingClientRect().left + "px";
    }, 1000);
    setTimeout(() => {
      cartBtn.classList.add("animate__tada");
      cartBtn.addEventListener("animationend", () => {
        cartBtn.classList.remove("animate__tada");
      });
    }, 800);
  }
});

// window.addToCart = (event) => {
//   console.log("add-to-cart", event.target);
// };
