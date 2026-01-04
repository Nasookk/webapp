import { HomePage } from "./pages/home.js";
import { FoodPage } from "./pages/food.js";
import { RestaurantPage } from "./pages/restaurant.js";
import { LoginPage } from "./pages/login.js";
import { RegisterPage } from "./pages/register.js";
import { OwnerDashboard } from "./pages/owner.js";

import "./search-bar.js";
import './page-home.js';
import './page-food.js';
import './page-restaurant.js';
import './card-restaurant.js';
import './card-food.js';
import './header.js';
import './page-login.js';
import './page-register.js';
import './page-owner.js';

const routes = {
  "/": HomePage,
  "/food": FoodPage,
  "/restaurant": RestaurantPage,
  "/login": LoginPage,
  "/register": RegisterPage,
  "/owner": OwnerDashboard
};

function router() {
  const path = window.location.hash.replace("#", "") || "/";
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const publicPaths = ["/food", "/restaurant"];
  if (token && role === "owner" && publicPaths.includes(path)) {
    window.location.hash = "#/owner";
    return;
  }

  if (path === "/owner" && role !== "owner") {
    window.location.hash = "#/";
    return;
  }
  if (token && (path === "/login" || path === "/register")) {
    window.location.hash = "#/";
    return;
  }

  const page = routes[path] || (() => "<h1>404 - Хуудас олдсонгүй</h1>");
  document.getElementById("app").innerHTML = page();
}

export function navigate(path) {
  window.location.hash = path;
}

window.addEventListener("hashchange", router);

router();