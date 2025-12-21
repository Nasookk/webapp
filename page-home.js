import "./card-home.js";

class FoodInfoApp extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
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
        const matchLoc = !location || loc === location;
        card.style.display = (matchSearch && matchLoc) ? "" : "none";
      });
    });
  }
  async downloadData() {
    const r = await fetch(this.dataurl);
    const d = await r.json();
    this.data = d;
  }
  renderFoodCards() {
    let foodCards = "";
    this.data
      .forEach(f =>
        foodCards += `<card-home name="${f.name}" location="${f.location}" price="${f.price}" rating="${f.rating}"></card-home>`);
    return foodCards;
  }
  renderRestaurants() {
    let restaurantCard = "";
    this.data
      .forEach(r =>
        restaurantCard += `<card-home name="${r.name}" location="${r.location}" rating="${r.rating}" img="${r.img}"></card-home>`);
    return restaurantCard;
  }

  async connectedCallback() {

    this.dataurl = this.getAttribute("url");
    console.log(this.getAttribute("url"));
    await this.downloadData();
    const css = `
    <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
          min-height: 100vh;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          box-shadow: 0 4px 6px rgba(255, 107, 53, 0.2);
        }

        .logo img {
          height: 50px;
          width: auto;
        }

        nav ul {
          display: flex;
          list-style: none;
          gap: 2rem;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 8px;
        }

        nav a:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .main-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          gap: 2rem;
        }

        .foods-section {
          flex: 1;
          min-width: 0;
        }

        .restaurants-section {
          width: 350px;
          flex-shrink: 0;
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
        .foods-grid > card-home {
          flex: 0 0 calc(100% / 3.5);
          min-width: 200px;
          display: block;
        }

        .foods-grid::-webkit-scrollbar {
          height: 8px;
        }

        .foods-grid::-webkit-scrollbar-track {
          background: #fff5eb;
          border-radius: 10px;
        }

        .foods-grid::-webkit-scrollbar-thumb {
          background: #ff8c42;
          border-radius: 10px;
        }

        .foods-grid::-webkit-scrollbar-thumb:hover {
          background: #ff6b35;
        }

        .restaurants-grid {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-height: calc(100vh);
          overflow-y: auto;
          overflow-x: hidden;
          padding-right: 0.5rem;
        }

        .restaurants-grid::-webkit-scrollbar {
          width: 8px;
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

        @media (max-width: 1024px) {
          .main-container {
            flex-direction: column;
          }

          .restaurants-section {
            width: 100%;
          }

          .restaurants-grid {
            max-height: 500px;
          }

          .foods-grid > card-home {
            flex: 0 0 calc(100% / 2.2);
          }
        }

        @media (max-width: 768px) {
          header {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
          }

          nav ul {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .search-bar {
            flex-direction: column;
          }

          #searchInput,
          #locationSelect,
          #searchBtn {
            width: 100%;
          }

          .foods-grid > card-home {
            flex: 0 0 calc(100% / 1.2);
          }
          h2 {
            font-size: 1.5rem;
          }

          .main-container {
            padding: 0 1rem;
          }
        }

        @media (max-width: 480px) {
          header {
            padding: 0.5rem;
          }

          .logo img {
            height: 40px;
          }

          nav a {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
          }
        }
      </style>`;

    this.shadowRoot.innerHTML = `
      ${css}
      <div class="main-container">
        <div class="foods-section">
          <h2>Popular</h2>
          <div class="foods-grid" id="foodList">
            ${this.renderFoodCards()}
          </div>
          <h2>Favourite</h2>
          <div class="foods-grid" id="foodList">
            ${this.renderFoodCards()}
          </div>
        </div>

        <div class="restaurants-section">
          <h2>Top Restaurants</h2>
          <div class="restaurants-grid" id="restaurantList">
          ${this.renderRestaurants()}
          </div>
          <br>
        </div>
      </div>
    `;

    this.attachEventListeners();

  }
}

customElements.define("food-info-app", FoodInfoApp);
