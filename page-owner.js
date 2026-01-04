class OwnerPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.restaurant = null;
    this.foods = [];
  }

  async connectedCallback() {
    await this.fetchData();
    this.render();
  }

  async fetchData() {
    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    try {
      const [resRest, resFoods] = await Promise.all([
        fetch("http://localhost:3000/api/owner/restaurant", { headers }),
        fetch("http://localhost:3000/api/owner/foods", { headers })
      ]);
      if (resRest.status === 401 || resFoods.status === 401) {
        localStorage.removeItem("token");
        location.hash = "/login";
        return;
      }
      if (resRest.ok) {
        this.restaurant = await resRest.json();
      } else {
        console.error(`Restaurant fetch failed: ${resRest.status} ${resRest.statusText}`);
        const text = await resRest.text();
        console.error("Response text:", text);
        this.restaurant = null;
      }
      if (resFoods.ok) {
        this.foods = await resFoods.json();
      } else {
        console.error(`Foods fetch failed: ${resFoods.status} ${resFoods.statusText}`);
        const text = await resFoods.text();
        console.error("Response text:", text);
        this.foods = [];
      }
    } catch (err) {
      console.error("Data fetch error:", err);
      this.restaurant = null;
      this.foods = [];
    }
  }


  async createRestaurant(data) {
    const res = await fetch("http://localhost:3000/api/owner/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Алдаа гарлаа");
      return;
    }
    await this.fetchData();
    this.render();
  }
  renderEmptyRestaurant() {
    this.shadowRoot.innerHTML = `
    <style>
      :host { display:block; font-family:'Segoe UI', sans-serif; background:#f0f2f5; min-height:100vh; }
      .center-container {
        display:flex;
        justify-content:center;
        align-items:center;
        min-height:100vh;
        padding:20px;
      }
      .card {
        background:white;
        padding:40px 30px;
        border-radius:16px;
        box-shadow:0 10px 25px rgba(0,0,0,0.1);
        width:100%;
        max-width:400px;
        text-align:center;
      }
      h2 {
        margin-bottom:25px;
        color:#1a1a1a;
      }
      .form-group {
        margin-bottom:20px;
        text-align:left;
      }
      .form-group label {
        display:block;
        margin-bottom:5px;
        font-weight:600;
        font-size:0.9rem;
      }
      .form-group input {
        width:100%;
        padding:12px;
        border-radius:8px;
        border:1px solid #ccc;
        box-sizing:border-box;
        font-size:0.95rem;
      }
      button {
        margin-top:10px;
        padding:12px 20px;
        width:100%;
        font-size:1rem;
        font-weight:bold;
        border:none;
        border-radius:8px;
        background:#ff6b35;
        color:white;
        cursor:pointer;
        transition:0.3s;
      }
      button:hover {
        background:#e85a2a;
      }
    </style>

    <div class="center-container">
      <div class="card">
        <h2>Шинэ Restaurant үүсгэх</h2>
        <div class="form-group">
          <label>Restaurant нэр</label>
          <input type="text" id="rName" placeholder="Nomad Kitchen">
        </div>
        <div class="form-group">
          <label>Байршил</label>
          <input type="text" id="rAddress" placeholder="Улаанбаатар">
        </div>
        <div class="form-group">
          <label>Зургийн зам</label>
          <input type="text" id="rImage" placeholder="./img/img_restaurants/default.webp">
        </div>
        <button id="saveRestaurant">Restaurant үүсгэх</button>
      </div>
    </div>
  `;

    const saveBtn = this.shadowRoot.querySelector("#saveRestaurant");
    saveBtn?.addEventListener("click", async () => {
      const data = {
        name: this.shadowRoot.querySelector("#rName").value,
        address: this.shadowRoot.querySelector("#rAddress").value,
        image: this.shadowRoot.querySelector("#rImage").value || "./img/img_restaurants/default.webp",
      };
      if (!data.name || !data.address) return alert("Нэр болон байршил заавал!");
      await this.createRestaurant(data);
    });
  }

  render() {
    if (!this.restaurant) {
      this.renderEmptyRestaurant();
      return;
    }
    this.shadowRoot.innerHTML = `
      <style>
<<<<<<< HEAD
        :host { 
          display: block; 
          padding: 20px; 
          font-family: 'Segoe UI', Tahoma, sans-serif; 
          background: #f0f2f5; min-height: 100vh; }
        .container { 
        max-width: 1200px; margin: 0 auto; }
        
        .header-card { background: white; padding: 20px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 25px; }
        .header-card h1 { margin: 0; font-size: 1.5rem; color: #1a1a1a; }
        
        .btn-add { background: #ff6b35; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s; }
        .btn-add:hover { background: #e85a2a; }
=======
      :host {
        display: block;
        padding: 20px;
        font-family: 'Segoe UI', Tahoma, sans-serif;
        background: #f5f6f8;
        min-height: 100vh;
      }
>>>>>>> 41dc65fcc5efa325d332abfb30980f4ac14f4460

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }

<<<<<<< HEAD
       
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(4px); }
        .modal.active { display: flex; }
        .modal-content { background: white; padding: 30px; border-radius: 16px; width: 400px; box-shadow: 0 20px 25px rgba(0,0,0,0.1); }
        .modal-content h2 { margin-top: 0; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.9rem; }
        .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
=======
      .header-card {
        background: #fff;
        padding: 20px 25px;
        border-radius: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 6px 18px rgba(0,0,0,0.06);
        margin-bottom: 30px;
      }

      .header-card h1 {
        margin: 0;
        font-size: 1.6rem;
        color: #222;
      }

      .btn-add {
        width: 200px;
        background: #ff6b35;
        color: #fff;
        border: none;
        padding: 12px 20px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s, transform 0.2s;
      }

      .btn-add:hover {
        background: #e85a2a;
        transform: translateY(-2px);
      }

      .food-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 25px;
      }

      .food-card {
        background: #fff;
        border-radius: 14px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        display: flex;
        flex-direction: column;
        transition: transform 0.2s, box-shadow 0.2s;
      }

      .food-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.12);
      }

      .food-card img {
        width: 100%;
        height: 180px;
        object-fit: cover;
      }

      .food-content {
        padding: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
      }

      .food-content h3 {
        margin: 0 0 10px 0;
        font-size: 1.1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .price {
        color: #ff6b35;
        font-weight: bold;
      }

      .details {
        font-size: 0.85rem;
        color: #555;
        margin-bottom: 15px;
        line-height: 1.4;
      }

      .btn-delete {
        align-self: center;
        padding: 10px 25px;
        background: #fee2e2;
        color: #ef4444;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s, transform 0.2s;
      }

      .btn-delete:hover {
        background: #fecaca;
        transform: translateY(-1px);
      }

      .delete-restaurant {
        width: 200px;
        padding: 10px 20px;
        background: #fee2e2;
        color: #ef4444;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.3s;
      }

      .delete-restaurant:hover {
        background: #fecaca;
      }

      .modal {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.5);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
      }

      .modal.active {
        display: flex;
      }

      .modal-content {
        background: #fff;
        padding: 30px;
        border-radius: 16px;
        width: 400px;
        box-shadow: 0 25px 30px rgba(0,0,0,0.1);
      }

      .modal-content h2 {
        margin-top: 0;
        font-size: 1.3rem;
        color: #222;
      }

      .form-group {
        margin-bottom: 15px;
      }

      .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 0.9rem;
        color: #333;
      }

      .form-group input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-sizing: border-box;
        font-size: 0.95rem;
        transition: border 0.2s;
      }

      .form-group input:focus {
        border-color: #ff6b35;
        outline: none;
      }
>>>>>>> 41dc65fcc5efa325d332abfb30980f4ac14f4460
      </style>
      <div class="container">
        <div class="header-card">
          <div style="display:flex; gap:15px; align-items:center;">
            <img
              src="${this.restaurant.image || './img/img_restaurants/default.webp'}"
              style="width:70px; height:70px; object-fit:cover; border-radius:10px;"
            />
            <div>
              <h1>${this.restaurant ? this.restaurant.name : 'Ачаалж байна...'}</h1>
              <p style="margin: 5px 0 0 0; color: #666;">Нийт ${this.foods.length} хоол байна</p>
            </div>
          </div>
          <button class="btn-add" id="openModal">+ Хоол нэмэх</button>
          <button class="delete-restaurant" id="deleteRestaurant">Restaurant устгах</button>
        </div>

        <div class="food-grid">
          ${this.foods.filter(f => f && f.name).map(f => `
            <div class="food-card">
              <img src="${f.image || './img/img_foods/default.webp'}" alt="${f.name}">
              <div class="food-content">
                <h3><span>${f.name}</span> <span class="price">${f.price}</span></h3>
                <div class="details">
                  <div><b>Орц:</b> ${f.ingredients || 'Мэдээлэлгүй'}</div>
                  <div><b>Илчлэг:</b> ${f.calories || 'Мэдээлэлгүй'}</div>
                </div>
                <button class="btn-delete" data-id="${f.id}">Устгах</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal" id="foodModal">
        <div class="modal-content">
          <h2>Шинэ хоол нэмэх</h2>
          <div class="form-group">
            <label>Хоолны нэр</label>
            <input type="text" id="inName" placeholder="Жишээ: Хуушуур">
          </div>
          <div class="form-group">
            <label>Үнэ</label>
            <input type="text" id="inPrice" placeholder="Жишээ: 12,000₮">
          </div>
          <div class="form-group">
            <label>Орц</label>
            <input type="text" id="inIng" placeholder="Гахайн мах, ногоо...">
          </div>
          <div class="form-group">
            <label>Илчлэг</label>
            <input type="text" id="inCal" placeholder="~520 ккал">
          </div>
          <div class="form-group">
            <label>Зургийн зам</label>
            <input type="text" id="inImg" placeholder="./img/img_foods/default.webp">
          </div>
          <button class="btn-add" id="saveBtn" style="width: 100%; margin-top: 10px;">Хадгалах</button>
          <button id="closeModal" style="width: 100%; margin-top: 10px; border: none; background: none; color: #999; cursor: pointer;">Болих</button>
        </div>
      </div>
      <div class="modal" id="restaurantModal">
        <div class="modal-content">
          <h2>Restaurant үүсгэх</h2>

          <div class="form-group">
            <label>Restaurant нэр</label>
            <input type="text" id="rName" placeholder="Жишээ: Nomad Kitchen">
          </div>
          <div class="form-group">
            <label>Байршил</label>
            <input type="text" id="rAddress" placeholder="Улаанбаатар">
          </div>
          <div class="form-group">
            <label>Зургийн зам</label>
            <input
              type="text"
              id="rImage"
              placeholder="./img/img_restaurants/default.webp"
            >
          </div>
          <button class="btn-add" id="saveRestaurant" style="width:100%">
            Үүсгэх
          </button>
          <button
            id="closeRestaurantModal"
            style="width:100%; margin-top:10px; border:none; background:none; color:#999; cursor:pointer;"
          >
            Болих
          </button>
        </div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    const modal = this.shadowRoot.querySelector("#foodModal");
    const rModal = this.shadowRoot.querySelector("#restaurantModal");

    const closeR = this.shadowRoot.querySelector("#closeRestaurantModal");
    const saveR = this.shadowRoot.querySelector("#saveRestaurant");
    const deleteRestaurantBtn = this.shadowRoot.querySelector("#deleteRestaurant");
    if (closeR && rModal) closeR.onclick = () => rModal.classList.remove("active");

    if (saveR && rModal) saveR.onclick = async () => {
      const data = {
        name: this.shadowRoot.querySelector("#rName").value,
        address: this.shadowRoot.querySelector("#rAddress").value,
        image: this.shadowRoot.querySelector("#rImage").value || "./img/img_restaurants/default.webp",
      };
      if (!data.name || !data.address) {
        alert("Нэр болон байршил заавал!");
        return;
      }
      await this.createRestaurant(data);
      rModal.classList.remove("active");
    };

    if (deleteRestaurantBtn) deleteRestaurantBtn.onclick = async () => {
      if (!confirm("Restaurant-аа бүр мөсөн устгах уу?")) return;
      const res = await fetch("http://localhost:3000/api/owner/restaurant", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        await this.fetchData();
        this.render();
      } else {
        alert("Устгахад алдаа гарлаа");
      }
    };
    if (modal) {
      const openModalBtn = this.shadowRoot.querySelector("#openModal");
      const closeModalBtn = this.shadowRoot.querySelector("#closeModal");
      const saveFoodBtn = this.shadowRoot.querySelector("#saveBtn");

      if (openModalBtn) openModalBtn.onclick = () => modal.classList.add("active");
      if (closeModalBtn) closeModalBtn.onclick = () => modal.classList.remove("active");

      if (saveFoodBtn) saveFoodBtn.onclick = async () => {
        const data = {
          restaurant_id: this.restaurant.id,
          name: this.shadowRoot.querySelector("#inName").value,
          price: this.shadowRoot.querySelector("#inPrice").value,
          ingredients: this.shadowRoot.querySelector("#inIng").value,
          calories: this.shadowRoot.querySelector("#inCal").value,
          image: this.shadowRoot.querySelector("#inImg").value || "./img/img_foods/default.webp",
        };
        if (!data.name || !data.price) {
          alert("Нэр болон үнэ заавал байх ёстой!");
          return;
        }
        const res = await fetch("http://localhost:3000/api/owner/foods", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          modal.classList.remove("active");
          await this.fetchData();
          this.render();
        } else {
          const err = await res.json();
          alert(err.error || "Хадгалахад алдаа гарлаа");
        }
      };
    }
    this.shadowRoot.querySelectorAll(".btn-delete").forEach(btn => {
      btn.onclick = async () => {
        if (!confirm("Энэ хоолыг устгах уу?")) return;
        const res = await fetch(`http://localhost:3000/api/owner/foods/${btn.dataset.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (res.ok) {
          await this.fetchData();
          this.render();
        }
      };
    });
  }
}
customElements.define("owner-page", OwnerPage);