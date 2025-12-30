class HomeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isLiked = false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Нэр байхгүй";
    const price = this.getAttribute("price") || "0₮";
    const rating = parseFloat(this.getAttribute("rating")) || 0;
    const ingredients = this.getAttribute("ingredients") || "Мэдээлэлгүй";
    const calories = this.getAttribute("calories") || "0";
    const img = this.getAttribute("img") || "https://via.placeholder.com/300x200";
    const location = this.getAttribute("location") || "Тодорхойгүй";

    const stars = Array.from({ length: 5 }, (_, i) => 
      `<span class="star">${i < Math.floor(rating) ? '★' : '☆'}</span>`
    ).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        
        .card {
          background: #ffffff;
          border-radius: 10px;
          padding: 15px; /* Анхны хэмжээ хэвээрээ */
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          font-family: sans-serif;
          position: relative;
          border: 1px solid #eee;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .like-btn {
          position: absolute; top: 20px; right: 20px;
          background: rgba(255,255,255,0.9); border: none; border-radius: 50%;
          width: 30px; height: 30px; cursor: pointer; font-size: 18px; color: #ccc;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1); z-index: 2;
        }
        .like-btn.active { color: #ff4d4d; }

        img {
          width: 100%;
          height: 140px; /* Анхны өндөр хэвээрээ */
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 10px;
        }

        .info { width: 100%; }

        /* Байршил (H3) - Улбар шар */
        .info h3 {
          margin: 0 0 5px 0;
          font-size: 14px;
          color: #ff6b35; 
          font-weight: bold;
        }

        /* Хоолны нэр - Хар */
        .food-name {
          font-size: 17px;
          color: #333;
          font-weight: bold;
          margin-bottom: 3px;
        }

        /* Үнэ - Улбар шар */
        .price-tag {
          color: #ff6b35; 
          font-weight: 800;
          font-size: 16px;
          margin-bottom: 5px;
        }

        .rating-container {
          margin-top: 5px;
          padding-top: 8px;
          border-top: 1px dashed #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .star { color: #f5a623; font-size: 14px; }

        /* Dialog стиль */
        dialog {
          border: none; border-radius: 15px; padding: 25px; width: 320px;
          font-family: sans-serif;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        dialog::backdrop { background: rgba(0,0,0,0.6); backdrop-filter: blur(2px); }
        
        .dialog-content h3 { color: #ff6b35; margin: 15px 0 5px 0; }
        .dialog-content h2 { margin: 0 0 15px 0; color: #333; }
        .dialog-price { color: #ff6b35; font-weight: 800; font-size: 20px; margin-bottom: 15px; }
        .dialog-details { font-size: 14px; color: #555; line-height: 1.6; }
        
        .close-btn {
          background: #ff6b35; color: white; border: none; padding: 12px;
          border-radius: 8px; cursor: pointer; width: 100%; margin-top: 20px;
          font-weight: bold; font-size: 16px;
        }
      </style>

      <div class="card">
        <button class="like-btn" id="likeBtn">❤</button>
        <img src="${img}" alt="${name}" />
        <div class="info">
          <h3>📍 ${location}</h3>
          <div class="food-name">${name}</div>
          <div class="price-tag">${price}</div>
          <div class="rating-container">
            <div>${stars}</div>
            <span style="font-size: 11px; color: #999;">${rating}</span>
          </div>
        </div>
      </div>

      <dialog id="foodDialog">
        <div class="dialog-content">
          <img src="${img}" style="height:160px; width: 100%; border-radius: 10px; object-fit: cover;" />
          <h3>📍 ${location}</h3>
          <h2>${name}</h2>
          <div class="dialog-price">${price}</div>
          <div class="dialog-details">
            <p>🌿 <b>Орц:</b> ${ingredients}</p>
            <p>🔥 <b>Калори:</b> ${calories} ккал</p>
            <p>⭐ <b>Үнэлгээ:</b> ${rating} / 5.0</p>
          </div>
          <button id="closeBtn" class="close-btn">Хаах</button>
        </div>
      </dialog>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const card = this.shadowRoot.querySelector(".card");
    const dialog = this.shadowRoot.querySelector("#foodDialog");
    const closeBtn = this.shadowRoot.querySelector("#closeBtn");
    const likeBtn = this.shadowRoot.querySelector("#likeBtn");

    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.isLiked = !this.isLiked;
      likeBtn.classList.toggle("active", this.isLiked);
    });

    card.addEventListener("click", () => {
      dialog.showModal();
    });

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dialog.close();
    });
  }
}

customElements.define("card-home", HomeCard);