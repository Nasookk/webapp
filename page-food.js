class FoodList extends HTMLElement {
  constructor() {
    super();
    const url = this.getAttribute("url") || "http://localhost:3000/api/foods";
    this.url = url;
    this.attachShadow({ mode: "open" });
    this.foodsData = [];
  }

  connectedCallback() {
    this.loadData();
    this.addEventListener("open-food", (e) => {
      this.openFoodDetail(e.detail);
    });
  }

  async loadData() {
    try {
      const res = await fetch(this.url);
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("API did not return array");
      }
      this.foodsData = data;
      this.render();
    } catch (err) {
      console.error("Failed to load foods:", err);
      this.foodsData = [];
      this.shadowRoot.innerHTML = `
      <p style="color:red">Failed to load food data</p>
    `;
    }
  }


  openFoodDetail(food) {
    const card = document.createElement("food-card");
    Object.entries(food).forEach(([k, v]) => {
      if (v != null) card.setAttribute(k, v);
    });
    document.body.appendChild(card);
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
      :host {
          display: block;
          background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
          min-height: 100vh;
        }
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
          margin-top: 0px;
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
          background: rgba(136, 59, 59, 0.2);
          transform: translateY(-2px);
        }
        .foods-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          padding-top: 1rem;
          
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
            restaurant="${food.restaurant}"
            img="${food.img}">
          </food-card>
        `).join('')}
      </div>
    </div> 
    `;
  }
}

customElements.define("food-list", FoodList);