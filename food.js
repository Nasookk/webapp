import "./food-page-info.js";

class FoodList extends HTMLElement {
  constructor() {
    super();
    const url = this.getAttribute("url") || "foods.json"; 
    this.url = url;
    this.attachShadow({ mode: "open" });
    this.foodsData = [];
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const res = await fetch(this.url);
      this.foodsData = await res.json();
      this.render();
    } catch (err) {
      console.error("Failed to load foods.json:", err);
      this.shadowRoot.innerHTML = `<p style="color:red">Error loading food data</p>`;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
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
        .search-bar {
          display: flex;
          gap: 1rem;
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
          flex-wrap: wrap;
        }
        #searchInput {
          flex: 1;
          min-width: 250px;
          padding: 1rem 1.5rem;
          border: 2px solid #ff8c42;
          border-radius: 50px;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(255, 140, 66, 0.15);
          transition: all 0.3s ease;
        }
        #searchInput:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.25);
          transform: translateY(-2px);
        }
        #locationSelect {
          padding: 1rem 1.5rem;
          border: 2px solid #ff8c42;
          border-radius: 50px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 140, 66, 0.15);
          transition: all 0.3s ease;
          min-width: 180px;
          color: #ff6b35;
          font-weight: 500;
        }
        #searchBtn {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
          transition: all 0.3s ease;
        }
        #searchBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
          background: linear-gradient(135deg, #ff9d5c 0%, #ff7c45 100%);
        }
        .foods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }
      </style>
      <div class="search-bar">
        <input type="text" id="searchInput" placeholder="Search for food or restaurant..." />
        <select id="locationSelect">
          <option value="">Select Location</option>
          <option value="MUIS I">MUIS I</option>
          <option value="MUIS II">MUIS II</option>
          <option value="MUIS III">MUIS III</option>
          <option value="MUIS IV">MUIS IV</option>
        </select>
        <button id="searchBtn">Search</button>
      </div>
      <div class="foods-grid">
        ${this.foodsData.map(food => `
          <food-card 
            name="${food.name}" 
            price="${food.price}" 
            rating="${food.rating}" 
            ingredients="${food.ingredients}" 
            calories="${food.calories}" 
            img="${food.img}">
          </food-card>
        `).join('')}
      </div>
    `;
  }
}

customElements.define("food-list", FoodList);