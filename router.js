import { HomePage } from "./pages/home.js";
import { FoodPage } from "./pages/food.js";
import { RestaurantPage } from "./pages/restaurant.js";
import { LoginPage } from "./pages/login.js";
import { RegisterPage } from "./pages/register.js";
import "./search-bar.js";
import './page-home.js';
import './page-food.js';
import './page-restaurant.js';
import './card-restaurant.js';
import './card-food.js';
import './header.js';
import './page-login.js';
import './page-register.js';
const routes = {
  "/": HomePage,
  "/food": FoodPage,
  "/restaurant": RestaurantPage,
  "/login": LoginPage,
  "/register": RegisterPage
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
