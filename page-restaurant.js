class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = []; 
  }

  async downloadData() {
    try {
      const r = await fetch("data-restaurant-page.json");
      const d = await r.json();
      this.data = d;
    } catch (err) {
      console.error("JSON", err);
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
       :host {
        display: block;
        background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
        min-height: 100vh;
        }
       h2 {
          color: #ff6b35;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          margin-top: 0px;
          text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.1);
          font-weight: 700;
        }
        .restaurants-section {
          max-width:1400px;
          margin: 0px auto;
          padding: 2rem; 
          padding-top: 1rem; 
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