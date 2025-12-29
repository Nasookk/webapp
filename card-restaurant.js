class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = { isFavorite: false, userRating: null };
  }

  connectedCallback() { this.render(); }

  render() {
    const name = this.getAttribute("name") || "Рестораны нэр";
    const location = this.getAttribute("location") || "Байршил тодорхойгүй";
    const rating = this.getAttribute("rating") || "0.0";
    const menu = this.getAttribute("menu") || "Мэдээлэлгүй";
    const traf = this.getAttribute("traf") || "Хэвийн";
    const img = this.getAttribute("img") || "restaurant.png";

    this.shadowRoot.innerHTML = `
      <style>
        :host { 
  display: block;
  width: 100%; /* Grid-ийн нүхэнд тааруулж сунана */
}

.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 18px;
  width: 100%; /* Хатуу 280px биш 100% болгох */
  min-height: 400px; /* Өндрийг нь түгжиж өгөх */
  box-sizing: border-box; /* Энэ маш чухал! */
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
          position: absolute; top: 25px; right: 25px;
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
        
        /* FoodCard-ийн үнэтэй ижил түвшинд харагдахын тулд */
        .location-text { color: #ff6b35; font-weight: 800; font-size: 1.1rem; margin-bottom: 10px; }
        
        .details {
          font-size: 0.85rem; color: #666; line-height: 1.5; margin-bottom: 15px;
          flex-grow: 1; /* Текст богино байсан ч доод хэсгийг түгжинэ */
        }
        .details b { color: #444; }

        .traffic-light {
          display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 5px;
          background: ${traf.includes('их') ? '#ff4d4d' : '#4caf50'};
        }

        .rating-section {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 12px; border-top: 1px dashed #eee;
        }
        .stars { display: flex; flex-direction: row-reverse; }
        .stars input { display: none; }
        .stars label { font-size: 1.4rem; color: #eee; cursor: pointer; transition: 0.2s; }
        .stars label:hover, .stars label:hover ~ label, .stars input:checked ~ label { color: #ffb800; }

        .rating-wrapper { display: flex; align-items: center; gap: 8px; }
        #rating-display {
          font-weight: 800; color: #ffb800; font-size: 1.1rem;
          opacity: 0; transform: scale(0.5); transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #rating-display.show { opacity: 1; transform: scale(1); }
        .avg-tag { font-size: 0.8rem; color: #999; font-weight: 600; }
      </style>

      <div class="card">
        <button class="fav-btn" id="favBtn">❤</button>
        <img src="${img}" alt="${name}" />
        
        <div class="info">
          <h3>${name}</h3>
          <div class="location-text">${location}</div>
          <div class="details">
            <div><b>🍽️ Цэс:</b> ${menu}</div>
            <div><span class="traffic-light"></span><b>🚦 Ачаалал:</b> ${traf}</div>
          </div>
        </div>
        
        <div class="rating-section">
          <div class="rating-wrapper">
            <div class="stars">
              <input type="radio" id="r5-${name}" name="rest-star" value="5"><label for="r5-${name}">★</label>
              <input type="radio" id="r4-${name}" name="rest-star" value="4"><label for="r4-${name}">★</label>
              <input type="radio" id="r3-${name}" name="rest-star" value="3"><label for="r3-${name}">★</label>
              <input type="radio" id="r2-${name}" name="rest-star" value="2"><label for="r2-${name}">★</label>
              <input type="radio" id="r1-${name}" name="rest-star" value="1"><label for="r1-${name}">★</label>
            </div>
            <span id="rating-display">0</span>
          </div>
          <span class="avg-tag">Үнэлгээ: ${rating}</span>
        </div>
      </div>
    `;

    this.initEvents();
  }

  initEvents() {
    const display = this.shadowRoot.querySelector("#rating-display");
    const inputs = this.shadowRoot.querySelectorAll('input[name="rest-star"]');
    const favBtn = this.shadowRoot.querySelector("#favBtn");

    favBtn.addEventListener("click", () => {
      this.state.isFavorite = !this.state.isFavorite;
      favBtn.classList.toggle("active");
    });

    inputs.forEach(input => {
      input.addEventListener("change", (e) => {
        display.textContent = e.target.value; 
        display.classList.add("show");
        this.state.userRating = e.target.value;
      });
    });
  }
}

customElements.define("restaurant-card", RestaurantCard);