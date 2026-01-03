class FoodCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = {
      isFavorite: false,
      userRating: null
    };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Хоолны нэр";
    const price = this.getAttribute("price") || "0₮";
    const rating = this.getAttribute("rating") || "0.0";
    const ingredients = this.getAttribute("ingredients") || "Мэдээлэл байхгүй";
    const calories = this.getAttribute("calories") || "0";
    const img = this.getAttribute("img") || "back.png";
    const restaurantName = this.getAttribute("restaurant-name") || "";
    const location = this.getAttribute("location") || "";

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
  display: block;
  width: 100%;
}

.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 18px;
  width: 100%;
  min-height: 400px;
  box-sizing: border-box;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
  transition: 0.3s ease;
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
}
        .card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        
        
        .fav-btn {
          position: absolute; top: 25px; left: 25px;
          background: rgba(255, 255, 255, 0.9); border: none; border-radius: 50%;
          width: 35px; height: 35px; cursor: pointer; font-size: 1.2rem; color: #ccc;
          display: flex; align-items: center; justify-content: center;
          transition: 0.2s; box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 10;
        }
        .fav-btn.active { color: #ff4d4d; }

        img { 
          width: 100%; 
          height: 160px; 
          border-radius: 15px; 
          object-fit: cover; 
          background: #f8f8f8; 
          margin-bottom: 12px;
        }

        .info h3 { margin: 0 0 5px 0; font-size: 1.2rem; color: #333; }
        .price { color: #ff6b35; font-weight: 800; font-size: 1.1rem; margin-bottom: 10px; }
        
        .details {
          font-size: 0.85rem; color: #666; line-height: 1.5; margin-bottom: 15px;
        }
        .details b { color: #444; }

        .rating-section {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px dashed #eee;
        }
        .stars { display: flex; flex-direction: row-reverse; }
        .stars input { display: none; }
        .stars label { font-size: 1.4rem; color: #eee; cursor: pointer; transition: 0.2s; }
        
        .stars label:hover, .stars label:hover ~ label,
        .stars input:checked ~ label { color: #ffb800; }

        .rating-wrapper { display: flex; align-items: center; gap: 8px; }
        .avg-tag { font-size: 0.8rem; color: #999; font-weight: 600; }

        #rating-display {
          font-weight: 800; color: #ffb800; font-size: 1.1rem;
          opacity: 0; transform: scale(0.5); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #rating-display.show { opacity: 1; transform: scale(1); }
      </style>

      <div class="card">
        <button class="fav-btn" id="favBtn">❤</button>
        <img src="${img}" alt="${name}" />
        
        <div class="info">
          <h3>${name}</h3>
          <div class="price">${price}</div>
          <div class="details">
            <div><b>Ресторан:</b> ${restaurantName}</div>
            <div><b>Байршил:</b> ${location}</div>
            <div><b>Орц:</b> ${ingredients}</div>
            <div><b>Калори:</b> ${calories} ккал</div>
            <div><b>Үнэлгээ:</b> ${rating}</div>
          </div>
        </div>
        
        <div class="rating-section">
          <div class="rating-wrapper">
            <div class="stars">
              <input type="radio" id="s5-${name}" name="star" value="5"><label for="s5-${name}">★</label>
              <input type="radio" id="s4-${name}" name="star" value="4"><label for="s4-${name}">★</label>
              <input type="radio" id="s3-${name}" name="star" value="3"><label for="s3-${name}">★</label>
              <input type="radio" id="s2-${name}" name="star" value="2"><label for="s2-${name}">★</label>
              <input type="radio" id="s1-${name}" name="star" value="1"><label for="s1-${name}">★</label>
            </div>
            <span id="rating-display">0</span>
          </div>
          <span class="avg-tag">Нийт: ${rating}</span>
        </div>
      </div>
    `;

    this.initEvents();
  }

  initEvents() {
    const display = this.shadowRoot.querySelector("#rating-display");
    const inputs = this.shadowRoot.querySelectorAll('input[name="star"]');
    const favBtn = this.shadowRoot.querySelector("#favBtn");
    const token = localStorage.getItem("token");
    this.state.isFavorite = this.getAttribute("is_favorite") === "1";
    favBtn.classList.toggle("active", this.state.isFavorite);

    favBtn.addEventListener("click", async () => {
      if (!token) {
        alert("Please Login");
        return;
      }
      const foodId = this.getAttribute("food-id");
      const method = this.state.isFavorite ? "DELETE" : "POST";
      const url = this.state.isFavorite
        ? `http://localhost:3000/api/favorites/foods/${foodId}`
        : `http://localhost:3000/api/favorites/foods`;

      try {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: !this.state.isFavorite ? JSON.stringify({ id: foodId }) : undefined
        });

        this.state.isFavorite = !this.state.isFavorite;
        favBtn.classList.toggle("active", this.state.isFavorite);
      } catch (err) {
        console.error(err);
        alert("Could not update favorite");
      }
    });

    inputs.forEach(input => {
      input.addEventListener("change", (e) => {
        const val = e.target.value;
        display.textContent = val;
        display.classList.add("show");
        this.state.userRating = val;
      });
    });
  }
}

customElements.define("food-card", FoodCard);