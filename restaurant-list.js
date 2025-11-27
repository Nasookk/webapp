class RestaurantList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.data = []; // өгөгдлийг хадгалах
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
        .restaurants-section {
          padding: 20px;
        }
        .restaurants-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          transition: transform 0.2s ease;
        }
        .card:hover {
          transform: translateY(-10px);
        }
        .card img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        .card-info {
          padding: 10px;
        }
        h2 {
          color: #ff6b35;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-shadow: 2px 2px 4px rgba(255, 107, 53, 0.1);
          font-weight: 700;
        }
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
          padding-bottom: 2rem;
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
        #locationSelect:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.25);
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
        #searchBtn:active {
          transform: translateY(0);
        }
        .foods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = `
      ${css}
      <header>
        <div class="logo">
          <img src="logow.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li><a href="home.html">Home</a></li>
            <li><a href="restaurant.html">Restaurants</a></li>
            <li><a href="food.html">Foods</a></li>
            <li><a href="login.html">Login</a></li>
          </ul>
        </nav>
      </header>

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

      <div class="restaurants-section">
        <h2>Restaurants</h2>
        <div class="restaurants-grid">
          ${restaurants.map(r => `
            <restaurant-card  
              name="${r.name}"  
              location="${r.location}"  
              rating="${r.rating}"  
              img="${r.img}">
            </restaurant-card>
          `).join("")}
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-list", RestaurantList);