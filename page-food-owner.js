class FoodCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.state = { isFavorite: false };
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Байгууллагаар нэвтэрсэн эсэхийг шалгах атрибут
    const isAdmin = this.getAttribute("is-admin") === "true";
    const name = this.getAttribute("name") || "Хоол";
    const price = this.getAttribute("price") || "0₮";
    const rating = this.getAttribute("rating") || "0.0";
    const ingredients = this.getAttribute("ingredients") || "Мэдээлэл байхгүй";
    const calories = this.getAttribute("calories") || "0";
    const img = this.getAttribute("img") || "back.png";

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }
        .card {
          background: #ffffff; border-radius: 20px; padding: 18px;
          min-height: 400px; box-sizing: border-box;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          font-family: sans-serif; position: relative;
          display: flex; flex-direction: column; border: 1px solid #f0f0f0;
        }

        /* Байгууллагад харагдах товчлуурууд */
        .admin-tools {
          display: ${isAdmin ? "flex" : "none"};
          position: absolute; top: 15px; left: 15px; gap: 5px; z-index: 10;
        }
        .admin-btn {
          border: none; border-radius: 6px; padding: 5px 10px;
          color: white; font-size: 11px; cursor: pointer; font-weight: bold;
        }
        .edit { background: #4CAF50; }
        .del { background: #ff4d4d; }

        .fav-btn {
          position: absolute; top: 25px; right: 25px;
          background: white; border: none; border-radius: 50%;
          width: 35px; height: 35px; cursor: pointer; color: #ccc;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1); z-index: 10;
        }
        .fav-btn.active { color: #ff4d4d; }

        img { width: 100%; height: 160px; border-radius: 15px; object-fit: cover; margin-bottom: 12px; }
        .info h3 { margin: 0 0 5px 0; color: #333; }
        .price { color: #ff6b35; font-weight: 800; font-size: 1.1rem; margin-bottom: 10px; }
        .details { font-size: 0.85rem; color: #666; flex-grow: 1; }
        .rating-section { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px dashed #eee; }
      </style>

      <div class="card">
        <div class="admin-tools">
          <button class="admin-btn edit" id="editBtn">Засах</button>
          <button class="admin-btn del" id="delBtn">Устгах</button>
        </div>
        <button class="fav-btn" id="favBtn">❤</button>
        <img src="${img}" alt="${name}" />
        <div class="info">
          <h3>${name}</h3>
          <div class="price">${price}</div>
          <div class="details">
            <div><b>🌿 Орц:</b> ${ingredients}</div>
            <div><b>🔥 Калори:</b> ${calories} ккал</div>
          </div>
        </div>
        <div class="rating-section">
          <span style="color: #ffb800; font-weight: bold;">★ ${rating}</span>
          <span style="font-size: 0.8rem; color: #999;">Нийт үнэлгээ</span>
        </div>
      </div>
    `;

    this.initEvents();
  }

  initEvents() {
    this.shadowRoot.querySelector("#favBtn").onclick = (e) => {
      e.target.classList.toggle("active");
    };

    // Байгууллага засах, устгах үйлдэл
    const editBtn = this.shadowRoot.querySelector("#editBtn");
    const delBtn = this.shadowRoot.querySelector("#delBtn");

    if (editBtn) {
      editBtn.onclick = () => this.dispatchEvent(new CustomEvent("edit-food", {
        bubbles: true, composed: true, detail: { name: this.getAttribute("name") }
      }));
    }
    if (delBtn) {
      delBtn.onclick = () => this.dispatchEvent(new CustomEvent("delete-food", {
        bubbles: true, composed: true, detail: { name: this.getAttribute("name") }
      }));
    }
  }
}
customElements.define("food-card", FoodCard);

class FoodList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.foodsData = [];
    // Энэ нь жинхэнэ систем дээр нэвтэрсэн хэрэглэгчийн төрлөөс хамаарна
    this.isAdmin = true; 
  }

  async connectedCallback() {
    await this.loadData();
    this.addEventListener("delete-food", (e) => this.deleteFood(e.detail.name));
  }

  async loadData() {
    const res = await fetch(this.getAttribute("url") || "data-food-page.json");
    this.foodsData = await res.json();
    this.render();
  }

  deleteFood(name) {
    if(confirm("Устгах уу?")) {
      this.foodsData = this.foodsData.filter(f => f.name !== name);
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; background: #fff5eb; min-height: 100vh; padding: 2rem; }
        .header { display: flex; justify-content: space-between; align-items: center; max-width: 1400px; margin: 0 auto 2rem; }
        h2 { color: #ff6b35; margin: 0; }
        .add-btn { 
          display: ${this.isAdmin ? "block" : "none"};
          background: #ff6b35; color: white; border: none; padding: 10px 20px; border-radius: 10px; cursor: pointer; font-weight: bold;
        }
        .foods-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px; max-width: 1400px; margin: 0 auto;
        }
      </style>

      <div class="header">
        <h2>${this.isAdmin ? "Байгууллагын удирдлага" : "Хоолны цэс"}</h2>
        <button class="add-btn">+ Шинэ хоол нэмэх</button>
      </div>

      <div class="foods-grid">
        ${this.foodsData.map(food => `
          <food-card 
            is-admin="${this.isAdmin}"
            name="${food.name}" price="${food.price}" rating="${food.rating}" 
            ingredients="${food.ingredients}" calories="${food.calories}" img="${food.img}">
          </food-card>
        `).join('')}
      </div>
    `;
  }
}
customElements.define("food-list", FoodList);