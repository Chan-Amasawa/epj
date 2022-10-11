import * as bootstrap from "bootstrap";
import { addToCart } from "./javascript/cart.js";
import { createItemUi } from "./javascript/item.js";
import { showLoaderUi, removeLoaderUi } from "./javascript/loader.js";
import "./style.scss";

export let items = [];
export const itemRow = document.querySelector(".item-row");
export const cartBtn = document.querySelector(".cart-btn");
export const cartCounter = document.querySelectorAll(".cart-counter");
export const cartBox = document.querySelector("#cartBox");
export const total = document.querySelector("#total");
// console.log(cartBtn);

showLoaderUi();
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    items = json;
    items.forEach((item) => {
      // console.log(item);
      itemRow.append(createItemUi(item));
    });
    // console.log(json);
    removeLoaderUi();
  });

itemRow.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-cart")) {
    addToCart(e);
  }
});

// window.addToCart = (event) => {
//   console.log("add-to-cart", event.target);
// };
