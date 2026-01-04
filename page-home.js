import "./card-home.js";

class FoodInfoApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.food = [];
    this.restaurant = [];
  }

  attachEventListeners() {
    const searchBar = document.querySelector("search-bar");
    if (!searchBar || !searchBar.shadowRoot) return;
    const root = searchBar.shadowRoot;
    const searchBtn = root.getElementById("searchBtn");
    const searchInput = root.getElementById("searchInput");
    const locationSelect = root.getElementById("locationSelect");
    if (!searchBtn || !searchInput || !locationSelect) return;

    searchBtn.addEventListener("click", () => {
      const searchText = searchInput.value.toLowerCase();
      const location = locationSelect.value;
      const allCards = this.shadowRoot.querySelectorAll("card-home");

      allCards.forEach(card => {
        const name = card.getAttribute("name").toLowerCase();
        const loc = card.getAttribute("location");
        const matchSearch = !searchText || name.includes(searchText);
        const matchLoc = !location || loc.toLowerCase() === location.toLowerCase();
        card.style.display = (matchSearch && matchLoc) ? "" : "none";
      });
    });
  }

  async downloadData(url) {
    const token = localStorage.getItem("token");
    const r = await fetch(url, {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {}
    });
    const data = await r.json();
    return Array.isArray(data) ? data : [];
  }

  renderFoodCards() {
    return this.food.map(f => `
    <card-home 
      food-id="${f.id}"
      name="${f.name}" 
      location="${f.restaurant_location}" 
      price="${f.price}" 
      rating="${f.rating}" 
      img="${f.img}" 
      ingredients="${f.ingredients}" 
      calories="${f.calories}"
      is_favorite="${f.is_favorite}">
    </card-home>
  `).join("");
  }

  renderFoodCardsFromArray(arr) {
    return arr.map(f => `
    <card-home 
      food-id="${f.id}"
      name="${f.name}" 
      location="${f.restaurant_location}" 
      price="${f.price}" 
      rating="${f.rating}" 
      img="${f.img}" 
      ingredients="${f.ingredients}" 
      calories="${f.calories}"
      is_favorite="${f.is_favorite}">
    </card-home>
  `).join("");
  }

  renderFavorites() {
    return this.food
      .filter(f => f.is_favorite === "1")
      .map(f => `
        <card-home 
          food-id="${f.id}"
          name="${f.name}" 
          location="${f.restaurant_location}" 
          price="${f.price}" 
          rating="${f.rating}" 
          img="${f.img}" 
          ingredients="${f.ingredients}" 
          calories="${f.calories}"
          is_favorite="${f.is_favorite}">
        </card-home>
      `).join('');
  }

  renderRestaurants() {
    return this.restaurant.map(r => `
      <card-home 
        type="restaurant"
        name="${r.name}" 
        location="${r.location}" 
        rating="${r.rating}" 
        img="${r.img}">
      </card-home>
    `).join("");
  }
  hasFavorites() {
    return this.food.some(f => f.is_favorite === "1");
  }

  render() {
    const css = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :host {
          display: block;
          background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
          padding-bottom: 2rem;
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .main-container {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: flex-start;
          justify-content: space-between;
          max-width: 100%;
        }
        .foods-section { 
          flex: 1; 
          min-width: 0; 
          margin-top: 20px;
        }
        .restaurants-section { 
          flex: 0 0 30%;
          width: 350px; 
          flex-shrink: 0; 
          margin-top: 20px;
        }
        h2 {
          color: #ff6b35;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.1);
          font-weight: 700;
        }
        .foods-grid {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          padding-bottom: 1rem;
          scroll-behavior: smooth;
        }
        .foods-grid.single-row {
          display: flex;
          overflow-x: auto;
          padding-bottom: 1rem;
        }
        .foods-grid > card-home {
          flex: 0 0 calc(100% / 3.5);
          min-width: 200px;
          display: block;
        }
        .favorites-grid > card-home {
          flex: 0 0 calc(100% / 3.5);
          min-width: 200px;
          display: block;
        }
        .foods-grid::-webkit-scrollbar { height: 6px; }
        .foods-grid::-webkit-scrollbar-track { background: #fff5eb; border-radius: 10px; }
        .foods-grid::-webkit-scrollbar-thumb { background: #ff8c42; border-radius: 10px; }
        .foods-grid::-webkit-scrollbar-thumb:hover { background: #ff6b35; }

        .restaurants-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-height: calc(70vh);
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 0.5rem;
        }
        .restaurants-grid::-webkit-scrollbar { width: 6px; }
        .restaurants-grid::-webkit-scrollbar-track { background: #fff5eb; border-radius: 10px; }
        .restaurants-grid::-webkit-scrollbar-thumb { background: #ff8c42; border-radius: 10px; }
        .restaurants-grid::-webkit-scrollbar-thumb:hover { background: #ff6b35; }

        @media (max-width: 1024px) {
          .main-container { flex-direction: column; }
          :host {
            padding-left: 0;
            padding-right: 0;
          }
          .foods-section {
            width: 100%;
          }
          .foods-grid {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            width: 100%;
          }
          .foods-grid > card-home { 
            flex: 1 1 auto; 
            min-width: 200px;
          }
          .favorites-grid > card-home {
            flex: 0 0 200px;
            min-width: 200px;
          }
          .restaurants-section { width: 100%; }
          .restaurants-grid {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 1rem;
            padding-bottom: 1rem;
            scroll-behavior: smooth;
            max-height: 500px;
          }
          .restaurants-grid > card-home {
            flex: 1 1 auto;
            min-width: 200px;
          }
          .restaurants-grid::-webkit-scrollbar {
            height: 6px;
          }
          .restaurants-grid::-webkit-scrollbar-track {
            background: #fff5eb;
            border-radius: 10px;
          }
          .restaurants-grid::-webkit-scrollbar-thumb {
            background: #ff8c42;
            border-radius: 10px;
          }
          .restaurants-grid::-webkit-scrollbar-thumb:hover {
            background: #ff6b35;
          }
        }
        @media (max-width: 768px) {
          :host {
            padding-left: 0;
            padding-right: 0;
          }
          .foods-section {
            width: 100%;
          }
          .foods-grid {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            width: 100%;
          }
          .foods-grid > card-home { 
            flex: 1 1 auto; 
            min-width: 200px;
          }
          .favorites-grid > card-home {
            flex: 0 0 200px;
            min-width: 200px;
          }
          h2 { font-size: 1.5rem; }
          .main-container { padding: 0 1rem; }
          .restaurants-grid {
            display: flex;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 1rem;
            max-height: none;
            padding-bottom: 1rem;
            scroll-behavior: smooth;
          }
          .restaurants-grid > card-home {
            flex: 1 1 auto;
            min-width: 200px;
          }
        }
        @media (max-width: 480px) {
          :host {
            padding-left: 0;
            padding-right: 0;
          }
          .foods-grid > card-home { 
            flex: 1 1 auto; 
            min-width: 200px;
          }
          .favorites-grid > card-home {
            flex: 0 0 200px;
            min-width: 200px;
          }
          h2 { font-size: 1.2rem; }
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${css}
      <div class="main-container">
        <div class="foods-section">
          <h2>Popular</h2>
          ${this.hasFavorites() ? `
            <div class="foods-grid single-row">
              ${this.renderFoodCards()}
            </div>
          ` : (() => {
        const mid = Math.ceil(this.food.length / 2);
        return `
              <div class="foods-grid single-row">
                ${this.renderFoodCardsFromArray(this.food.slice(0, mid))}
              </div>
              <br>
              <br>
              <br>
              <div class="foods-grid single-row">
                ${this.renderFoodCardsFromArray(this.food.slice(mid))}
              </div>
            `;
      })()}
          ${this.hasFavorites() ? `
            <h2>Favorite</h2>
            <div class="foods-grid single-row favorites-grid">
              ${this.renderFavorites()}
            </div>
          ` : ``}
        </div>
        <div class="restaurants-section">
          <h2>Top Restaurants</h2>
          <div class="restaurants-grid">${this.renderRestaurants()}</div>
        </div>
      </div>
    `;
  }

  async reloadFromDatabase() {
    const [foodData, restaurantData] = await Promise.all([
      this.downloadData(this.getAttribute("food-url")),
      this.downloadData(this.getAttribute("restaurant-url"))
    ]);
    this.food = foodData.map(f => ({
      ...f,
      is_favorite: String(f.is_favorite)
    }));
    this.restaurant = restaurantData;
    this.render();
    this.attachEventListeners();
  }

  openFoodCard(foodData) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,0.5)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = 9999;
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 0.3s ease";

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    const foodCard = document.createElement("food-card");
    foodCard.setAttribute("food-id", foodData.id);
    Object.entries(foodData).forEach(([key, value]) => {
      if (value != null) foodCard.setAttribute(key, value);
    });
    if (foodData.is_favorite != null) {
      foodCard.setAttribute("is_favorite", foodData.is_favorite);
    }

    const container = document.createElement("div");
    container.style.position = "relative";
    container.style.maxWidth = "500px";
    container.style.width = "90%";
    container.style.transform = "scale(0.5)";
    container.style.transition = "transform 0.3s ease";

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "×";
    closeBtn.style.position = "absolute";
    closeBtn.style.top = "10px";
    closeBtn.style.right = "10px";
    closeBtn.style.fontSize = "1.5rem";
    closeBtn.style.background = "#ff6b35";
    closeBtn.style.color = "#fff";
    closeBtn.style.border = "none";
    closeBtn.style.borderRadius = "50%";
    closeBtn.style.width = "35px";
    closeBtn.style.height = "35px";
    closeBtn.style.cursor = "pointer";
    closeBtn.addEventListener("click", closeModal);

    container.appendChild(foodCard);
    container.appendChild(closeBtn);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = "1";
      container.style.transform = "scale(1)";
    });

    function closeModal() {
      overlay.style.opacity = "0";
      container.style.transform = "scale(0.5)";
      setTimeout(() => {
        overlay.remove(),
          document.querySelector("food-info-app")?.reloadFromDatabase();
      }, 300);
    }
  }


  async connectedCallback() {
    const foodUrl = this.getAttribute("food-url");
    const restaurantUrl = this.getAttribute("restaurant-url");
    if (!foodUrl || !restaurantUrl) {
      console.error("Both food-url and restaurant-url are required");
      return;
    }
    const [foodData, restaurantData] = await Promise.all([
      this.downloadData(foodUrl),
      this.downloadData(restaurantUrl)
    ]);
    this.food = foodData.map(f => ({
      ...f,
      is_favorite: String(f.is_favorite)
    }));
    this.restaurant = restaurantData;
    this.render();
    this.attachEventListeners();
    this.shadowRoot.addEventListener("open-food", (e) => {
      this.openFoodCard(e.detail);
    });
    this.shadowRoot.addEventListener("favorite-updated", async (e) => {
      await this.reloadFromDatabase();
    });
  }
}

customElements.define("food-info-app", FoodInfoApp);