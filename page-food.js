class FoodList extends HTMLElement {
  constructor() {
    super();
    const url = this.getAttribute("url") || "data-food-page.json"; 
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
          h2 {
          color: #ff6b35;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.1);
          font-weight: 700;
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
        .foods-section {
          max-width:1400px;
          margin: 20px;
        }
        .foods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
      </style>
    <div class="foods-section">
      <h2>Foods</h2>
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
    </div> 
    `;
  }
}

customElements.define("food-list", FoodList);