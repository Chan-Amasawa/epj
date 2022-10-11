import { excerpt } from "./utilities";

export const createItemUi = function ({
  id,
  image,
  title,
  description,
  price,
}) {
  let itemDiv = document.createElement("div");
  itemDiv.classList.add("col-md-6", "col-lg-4");
  itemDiv.innerHTML = `
        <div class="card item-card" item-id='${id}'>
          <div class="card-body d-flex flex-column">
            <div class="mb-3">
              <img src="${image}" class="item-img" alt="">
            </div>
            <div class="card-title fw-bold text-truncate">
              ${title}
            </div>
            <div class="card-text small mb-3">
              ${excerpt(description)}
            </div>

            <div class="d-flex justify-content-between align-items-center mt-auto">
              <p class="fw-bold mb-0">$ <span>${price}</span></p>
              <button class="btn btn-outline-primary add-cart">
                <i class="bi bi-cart-plus pe-none"></i> Add Cart
              </button>
            </div>
          </div>
        </div>
      `;
  return itemDiv;
};
