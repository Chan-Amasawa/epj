import { showLoaderUi, removeLoaderUi } from "./javascript/loader.js";
import "./style.scss";

let items = [];
let itemRow = document.querySelector(".item-row");

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
        <div class="card item-card mb-4">
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
              <button class="btn btn-outline-primary">
                <i class="bi bi-cart-plus"></i>
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
