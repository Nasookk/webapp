class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = []; 
  }

  async downloadData() {
    try {
      const r = await fetch("restaurant.json");
      const d = await r.json();
      this.data = d;
    } catch (err) {
      console.error("JSON татахад алдаа гарлаа:", err);
      this.data = [];
    }
  }

  async connectedCallback() {
    await this.downloadData();
    this.render();
  }

  render() {
    const restaurants = this.data || [];

    const css = `
      <style>
       h2 {
          color: #ff6b35;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.1);
          font-weight: 700;
        }
        .restaurants-section {
          max-width:1400px;
          margin: 20px;
        }
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
      
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${css}
    

      <div class="restaurants-section">
        <h2>Restaurants</h2>
        <div class="restaurants-grid">
          ${restaurants.map(r => `
            <restaurant-card  
              name="${r.name}"  
              location="${r.location}"  
              rating="${r.rating}"
              menu="${r.menu}" 
              traf="${r.traf}" 
              img="${r.img}">
            </restaurant-card>
          `).join("")}
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-list", RestaurantList);