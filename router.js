import { HomePage } from "./pages/home.js";
import { FoodPage } from "./pages/food.js";
import { RestaurantPage } from "./pages/restaurant.js";
import { LoginPage } from "./pages/login.js";
import './food-info-app.js';
import './restaurant-list.js';
import './restaurant-card.js';
import './food.js';
import './header.js';
const routes = {
  "/": HomePage,
  "/food": FoodPage,
  "/restaurant": RestaurantPage,
  "/login": LoginPage,
};

function router() {
  const path = window.location.hash.replace("#", "") || "/";
  const page = routes[path] || (() => "<h1>404</h1>");
  document.getElementById("app").innerHTML = page();
}

export function navigate(path) {
  window.location.hash = path;
}

window.addEventListener("hashchange", router);
router();
