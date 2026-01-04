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
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const [resRest, resFoods] = await Promise.all([
        fetch('http://localhost:3000/api/owner/restaurant', { headers }),
        fetch('http://localhost:3000/api/owner/foods', { headers })
      ]);
      if (resRest.ok) this.restaurant = await resRest.json();
      if (resFoods.ok) this.foods = await resFoods.json();
    } catch (err) {
      console.error("Data fetch error:", err);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
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

        .food-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .food-card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.05); position: relative; }
        .food-card img { width: 100%; height: 180px; object-fit: cover; }
        .food-content { padding: 15px; }
        .food-content h3 { margin: 0 0 10px 0; display: flex; justify-content: space-between; }
        .price { color: #ff6b35; font-weight: bold; }
        .details { font-size: 0.85rem; color: #666; margin-bottom: 10px; line-height: 1.4; }
        
        .btn-delete { width: 100%; padding: 8px; background: #fee2e2; color: #ef4444; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; margin-top: 10px; }
        .btn-delete:hover { background: #fecaca; }

       
        .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; justify-content: center; align-items: center; z-index: 1000; backdrop-filter: blur(4px); }
        .modal.active { display: flex; }
        .modal-content { background: white; padding: 30px; border-radius: 16px; width: 400px; box-shadow: 0 20px 25px rgba(0,0,0,0.1); }
        .modal-content h2 { margin-top: 0; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.9rem; }
        .form-group input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; box-sizing: border-box; }
      </style>

      <div class="container">
        <div class="header-card">
          <div>
            <h1>${this.restaurant ? this.restaurant.name : 'Ачаалж байна...'}</h1>
            <p style="margin: 5px 0 0 0; color: #666;">Нийт ${this.foods.length} хоол байна</p>
          </div>
          <button class="btn-add" id="openModal">+ Хоол нэмэх</button>
        </div>

        <div class="food-grid">
          ${this.foods.map(f => `
            <div class="food-card">
              <img src="${f.image || './img/img_foods/huushuur.webp'}" alt="${f.name}">
              <div class="food-content">
                <h3><span>${f.name}</span> <span class="price">${f.price}</span></h3>
                <div class="details">
                  <div>🥘 <b>Орц:</b> ${f.ingredients || 'Мэдээлэлгүй'}</div>
                  <div>🔥 <b>Илчлэг:</b> ${f.calories || 'Мэдээлэлгүй'}</div>
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
            <input type="text" id="inImg" placeholder="./img/img_foods/huushuur.webp">
          </div>
          <button class="btn-add" id="saveBtn" style="width: 100%; margin-top: 10px;">Хадгалах</button>
          <button id="closeModal" style="width: 100%; margin-top: 10px; border: none; background: none; color: #999; cursor: pointer;">Болих</button>
        </div>
      </div>
    `;
    this.attachEvents();
  }

  attachEvents() {
    const modal = this.shadowRoot.querySelector("#foodModal");
    this.shadowRoot.querySelector("#openModal").onclick = () => modal.classList.add("active");
    this.shadowRoot.querySelector("#closeModal").onclick = () => modal.classList.remove("active");

    // Хадгалах (POST)
    this.shadowRoot.querySelector("#saveBtn").onclick = async () => {
      const data = {
        name: this.shadowRoot.querySelector("#inName").value,
        price: this.shadowRoot.querySelector("#inPrice").value,
        ingredients: this.shadowRoot.querySelector("#inIng").value,
        calories: this.shadowRoot.querySelector("#inCal").value,
        img: this.shadowRoot.querySelector("#inImg").value || "./img/img_foods/default.webp",
      };

      if (!data.name || !data.price) return alert("Нэр болон үнэ заавал байх ёстой!");

      const res = await fetch('http://localhost:3000/api/owner/foods', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
      });

      if (res.ok) {
        modal.classList.remove("active");
        this.connectedCallback(); // Жагсаалтыг шинэчлэх
      } else {
        alert("Хадгалахад алдаа гарлаа");
      }
    };

    // Устгах (DELETE)
    this.shadowRoot.querySelectorAll(".btn-delete").forEach(btn => {
      btn.onclick = async () => {
        if (!confirm("Энэ хоолыг устгах уу?")) return;
        const res = await fetch(`http://localhost:3000/api/owner/foods/${btn.dataset.id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
        });
        if (res.ok) this.connectedCallback();
      };
    });
  }
}
customElements.define("owner-page", OwnerPage);