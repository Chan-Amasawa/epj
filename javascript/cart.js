import { cartBox, cartBtn, cartCounter, items, total } from "../main.js";
import Swal from "sweetalert2";

export const createItemCard = function ({ id, title, price, image }) {
  const div = document.createElement("div");
  div.classList.add("item-in-cart");
  div.innerHTML = `
      <div class="p-3 border bg-white rounded overflow-hidden mb-3 position-relative">
        <div class="mb-2 d-flex cart-item-img-box">
          <img src="${image}" class="cart-item-img" alt="">
        </div>
        <p class="small fw-bold">${title}</p>
        <button onclick="del(event)" class="btn btn-danger btn-sm position-absolute del-cart">
          <i class="bi bi-trash3"></i>
        </button>
        <div class="row justify-content-between align-items-center">
            <div class="col-4">
              <p class="mb-0">$ <span class="cart-cost">${price}</span></p>
            </div>
            <div class="col-6">
              <div class="cart-item-quantity input-group input-group-sm">              
                <button class="btn btn-primary" onclick="dec(event,${price})">
                  <i class="bi bi-dash pe-none"></i>
                </button>
                <input type="number" class="form-control text-end cart-quantity" value="1">       
                <button class="btn btn-primary" onclick="inc(event,${price})">
                  <i class="bi bi-plus pe-none"></i>
                </button>
              </div>
            </div>
        </div>
      </div>
    `;
  cartBox.append(div);
  cartCounterUpdate();
};

export const cartCounterUpdate = function () {
  let unitCounter = parseInt(cartCounter[0].innerText);
  //   console.log(unitCounter);
  cartCounter.forEach(function (current) {
    current.innerText = cartBox.childElementCount;
  });
  //   cartCounter.innerText = parseInt(cartCounter.innerText) + 1;
};

window.del = function (event, price) {
  let currentCart = event.target.closest(".item-in-cart");

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      currentCart.classList.add("animate__animated", "animate__hinge");
      currentCart.addEventListener("animationend", () => {
        currentCart.remove();
        costTotal();
        cartCounterUpdate();
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};

window.inc = function (event, price) {
  let currentCart = event.target.closest(".item-in-cart");
  let cartQuantity = currentCart.querySelector(".cart-quantity");

  //add new images
  let imgBox = currentCart.querySelector(".cart-item-img-box");
  let images = currentCart.querySelector(".cart-item-img");

  let newImg = new Image();
  newImg.src = images.src;
  newImg.classList.add("cart-item-img");
  newImg.classList.add("animate__animated");
  newImg.classList.add("animate__rotateInUpLeft");
  imgBox.append(newImg);

  cartQuantity.valueAsNumber += 1;
  let cartCost = currentCart.querySelector(".cart-cost");
  cartCost.innerText = (cartQuantity.valueAsNumber * price).toFixed(2);
  costTotal();
};

window.dec = function (event, price) {
  let currentCart = event.target.closest(".item-in-cart");
  let cartQuantity = currentCart.querySelector(".cart-quantity");
  if (cartQuantity.valueAsNumber > 0) {
    cartQuantity.valueAsNumber -= 1;
    let cartCost = currentCart.querySelector(".cart-cost");
    cartCost.innerText = (cartCost.innerText - price).toFixed(2);
    costTotal();

    //remove imges
    let imgBox = currentCart.querySelector(".cart-item-img-box");
    imgBox.lastChild.remove();
    if (cartQuantity.valueAsNumber === 0) {
      del(event);
    }
  }
};

export const costTotal = function () {
  let allCartCost = [...document.querySelectorAll(".cart-cost")];
  total.innerHTML = allCartCost
    .reduce((pv, cv) => pv + parseFloat(cv.innerHTML), 0)
    .toFixed(2);
  console.log(total);
};

export const addToCart = function (e) {
  let btnParent = e.target.closest(".item-card");
  let itemId = btnParent.getAttribute("item-id");
  let itemDetail = items.find((item) => item.id === parseInt(itemId));
  let parentImg = btnParent.querySelector(".item-img");
  //   console.log(parentImg);

  let newImage = new Image();
  newImage.src = parentImg.src;
  newImage.style.position = "fixed";
  newImage.style.height = 100 + "px";
  newImage.style.zIndex = 2000;
  newImage.style.transition = 1 + "s";
  newImage.style.top = parentImg.getBoundingClientRect().top + "px";
  newImage.style.left = parentImg.getBoundingClientRect().left + "px";
  //   console.log(newImage);
  document.body.append(newImage);

  setTimeout(() => {
    newImage.style.transform = "rotate(360deg)";
    newImage.style.height = 0 + "px";
    newImage.style.top =
      cartBtn.querySelector(".bi").getBoundingClientRect().top + "px";
    newImage.style.left =
      cartBtn.querySelector(".bi").getBoundingClientRect().left + "px";
  }, 10);
  setTimeout(() => {
    cartBtn.classList.add("animate__tada");
    newImage.remove();
    costTotal();
  }, 800);

  createItemCard(itemDetail);

  cartBtn.addEventListener("animationend", () => {
    cartBtn.classList.remove("animate__tada");
  });
};
