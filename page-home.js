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
    const r = await fetch(url);
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

  renderFavorites() {
    return this.food
      .filter(f => f.is_favorite === 1)
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

  render() {
    const css = `
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :host {
          display: block;
          background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
          min-height: 100vh;
        }
        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          
          display: flex;
          gap: 2rem;
        }
        .foods-section { 
          flex: 1; 
          min-width: 0; 
          margin-top: 20px;}

        .restaurants-section { 
          width: 350px; 
          flex-shrink: 0; 
          margin-top: 20px;}
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
        .foods-grid > card-home {
          flex: 0 0 calc(100% / 3.5);
          min-width: 200px;
          display: block;
        }
        .foods-grid::-webkit-scrollbar { height: 8px; }
        .foods-grid::-webkit-scrollbar-track { background: #fff5eb; border-radius: 10px; }
        .foods-grid::-webkit-scrollbar-thumb { background: #ff8c42; border-radius: 10px; }
        .foods-grid::-webkit-scrollbar-thumb:hover { background: #ff6b35; }
        .restaurants-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-height: calc(100vh);
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 0.5rem;
        }
        .restaurants-grid::-webkit-scrollbar { width: 8px; }
        .restaurants-grid::-webkit-scrollbar-track { background: #fff5eb; border-radius: 10px; }
        .restaurants-grid::-webkit-scrollbar-thumb { background: #ff8c42; border-radius: 10px; }
        .restaurants-grid::-webkit-scrollbar-thumb:hover { background: #ff6b35; }
        @media (max-width: 1024px) {
          .main-container { flex-direction: column; }
          .restaurants-section { width: 100%; }
          .restaurants-grid { max-height: 500px; }
          .foods-grid > card-home { flex: 0 0 calc(100% / 2.2); }
        }
        @media (max-width: 768px) {
          .foods-grid > card-home { flex: 0 0 calc(100% / 1.2); }
          h2 { font-size: 1.5rem; }
          .main-container { padding: 0 1rem; }
        }
        @media (max-width: 480px) {
          h2 { font-size: 1.2rem; }
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${css}
      <div class="main-container">
        <div class="foods-section">
          <h2>Popular</h2>
          <div class="foods-grid">${this.renderFoodCards()}</div>
          <h2>Favorite</h2>
          <div class="foods-grid">
            ${this.food.filter(f => f.is_favorite === 1).length > 0
              ? this.renderFavorites()
              : this.renderFoodCards()
            }
          </div>
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
    this.food = foodData;
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
    this.food = foodData;
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