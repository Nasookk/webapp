class HomeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isLiked = this.getAttribute("is_favorite") === "1";
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const type = this.getAttribute("type") || "food";
    const name = this.getAttribute("name") || "Нэр байхгүй";
    const price = this.getAttribute("price") || "0₮";
    const rating = parseFloat(this.getAttribute("rating")) || 0;
    const ingredients = this.getAttribute("ingredients") || "Мэдээлэлгүй";
    const calories = this.getAttribute("calories") || "0";
    const imgAttr = this.getAttribute("img");
    const img = imgAttr && imgAttr.trim() !== ""
      ? imgAttr
      : "https://via.placeholder.com/300x200";
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
          padding: 15px;
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
          height: 140px;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 10px;
        }

        .info { width: 100%; }

        .info h3 {
          margin: 0 0 5px 0;
          font-size: 14px;
          color: #ff6b35; 
          font-weight: bold;
        }
        .food-name {
          font-size: 17px;
          color: #333;
          font-weight: bold;
          margin-bottom: 3px;
        }
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
          <h3>${location}</h3>
          <div class="food-name">${name}</div>
          ${type === "food" ? `<div class="price-tag">${price}</div>` : ""}
          <div class="rating-container">
            <div>${stars}</div>
            <span style="font-size: 11px; color: #999;">${rating}</span>
          </div>
        </div>
      </div>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const card = this.shadowRoot.querySelector(".card");
    const likeBtn = this.shadowRoot.querySelector("#likeBtn");
    likeBtn.classList.toggle("active", this.isLiked);
    const token = localStorage.getItem("token");

    likeBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      if (!token) {
        alert("Please Login");
        return;
      }
      const foodId = this.getAttribute("food-id");
      const method = this.isLiked ? "DELETE" : "POST";
      const url = this.isLiked
        ? `http://localhost:3000/api/favorites/foods/${foodId}`
        : `http://localhost:3000/api/favorites/foods`;
      try {
        await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          },
          body: !this.isLiked ? JSON.stringify({ id: foodId }) : undefined
        });
        this.isLiked = !this.isLiked;
        likeBtn.classList.toggle("active", this.isLiked);
      } catch (err) {
        console.error(err);
        alert("Could not update favorite");
      }
    });

    card.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("open-food", {
        detail: {
          id: this.getAttribute("food-id"),
          name: this.getAttribute("name"),
          price: this.getAttribute("price"),
          rating: this.getAttribute("rating"),
          ingredients: this.getAttribute("ingredients"),
          calories: this.getAttribute("calories"),
          img: this.getAttribute("img"),
          location: this.getAttribute("location")
        },
        bubbles: true,
        composed: true
      }));
    });
  }
}

customElements.define("card-home", HomeCard);