import "./food-card.js";

class FoodInfoApp extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
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
        .foods-grid > food-card {
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
          max-height: calc(100vh - 300px);
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

          .foods-grid > food-card {
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

          .foods-grid > food-card {
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
      </style>
      <div class="search-bar">
      <input id="searchInput" type="text" placeholder="Search food...">

      <select id="locationSelect">
        <option value="">All Locations</option>
        <option value="MUIS I">MUIS I</option>
        <option value="MUIS II">MUIS II</option>
        <option value="MUIS III">MUIS III</option>
        <option value="MUIS IV">MUIS IV</option>
      </select>

      <button id="searchBtn">Search</button>
      </div>
      <div class="main-container">
        <div class="foods-section">
          <h2>Popular</h2>
          <div class="foods-grid" id="foodList">
            <food-card name="Пирошки" location="MUIS I" price="2,000₮" rating="5/5"
              img="https://source.unsplash.com/300x200/?pastry"
              ingredients="Flour, meat, onion"
              calories="350 kcal">
            </food-card>

            <food-card name="Гурилтай шөл" location="MUIS II" price="13,000₮" rating="4/5"
              img="https://source.unsplash.com/300x200/?noodle-soup"
              ingredients="Noodles, beef, vegetables"
              calories="500 kcal">
            </food-card>

            <food-card name="Цуйван" location="MUIS III" price="12,000₮" rating="4.5/5"
              img="https://source.unsplash.com/300x200/?stir-fry"
              ingredients="Noodles, beef, carrot"
              calories="600 kcal">
            </food-card>

            <food-card name="Бууз" location="MUIS I" price="8,000₮" rating="5/5"
              img="https://source.unsplash.com/300x200/?dumpling"
              ingredients="Flour, mutton, onion"
              calories="450 kcal">
            </food-card>

            <food-card name="Хуушуур" location="MUIS IV" price="3,000₮" rating="4.5/5"
              img="https://source.unsplash.com/300x200/?fried-food"
              ingredients="Flour, beef, onion"
              calories="400 kcal">
            </food-card>

            <food-card name="Банштай цай" location="MUIS II" price="5,000₮" rating="4/5"
              img="https://source.unsplash.com/300x200/?tea"
              ingredients="Tea, milk, flour"
              calories="200 kcal">
            </food-card>
          </div>
        </div>

        <div class="restaurants-section">
          <h2>Top Restaurants</h2>
          <div class="restaurants-grid" id="restaurantList">
            <food-card name="Restaurant1" location="MUIS III" rating="5/5"
              img="https://source.unsplash.com/300x200/?restaurant">
            </food-card>

            <food-card name="Restaurant2" location="MUIS II" rating="4/5"
              img="https://source.unsplash.com/300x200/?cafe">
            </food-card>

            <food-card name="Restaurant3" location="MUIS I" rating="4.5/5"
              img="https://source.unsplash.com/300x200/?dining">
            </food-card>

            <food-card name="Restaurant4" location="MUIS IV" rating="4.5/5"
              img="https://source.unsplash.com/300x200/?bistro">
            </food-card>

            <food-card name="Restaurant5" location="MUIS I" rating="5/5"
              img="https://source.unsplash.com/300x200/?eatery">
            </food-card>
          </div>
        </div>
      </div>
    `;

    const searchBtn = shadow.getElementById("searchBtn");
    const searchInput = shadow.getElementById("searchInput");
    const locationSelect = shadow.getElementById("locationSelect");

    searchBtn.addEventListener("click", () => {
      const searchText = searchInput.value.toLowerCase();
      const location = locationSelect.value;
      const allCards = shadow.querySelectorAll("food-card");

      allCards.forEach(card => {
        const name = card.getAttribute("name").toLowerCase();
        const loc = card.getAttribute("location");
        const matchSearch = !searchText || name.includes(searchText);
        const matchLoc = !location || loc === location;
        card.style.display = (matchSearch && matchLoc) ? "flex" : "none";
      });
    });
  }
}

customElements.define("food-info-app", FoodInfoApp);