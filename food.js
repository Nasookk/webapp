import "./food-card.js";

const foodsData = [
  {
    name: "Пирошки",
    price: "2,000₮",
    rating: "5/5",
    ingredients: "Гурил, мах, сонгино",
    calories: "~320 ккал",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Гурилтай шөл",
    price: "13,000₮",
    rating: "4/5",
    ingredients: "Гурил, мах, ногоо",
    calories: "~280 ккал",
    img: "https://images.unsplash.com/photo-1625944528833-3f2a9f2f7fcb?q=80&w=300&auto=format&fit=crop"
  },
  {
    name: "Цуйван",
    price: "12,000₮",
    rating: "4.5/5",
    ingredients: "Гахайн мах, гоймон, ногоо",
    calories: "~520 ккал",
    img: "https://images.unsplash.com/photo-1617093727343-374698b1c509?q=80&w=300&auto=format&fit=crop"
  }
];

class FoodList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
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
      <div class="foods-grid">
        ${foodsData.map(food => `
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
