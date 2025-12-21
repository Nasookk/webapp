class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const location = this.getAttribute("location");
    const rating = this.getAttribute("rating");
    const menu = this.getAttribute("menu");
    const traf = this.getAttribute("traf");
    const img = this.getAttribute("img");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: #f3f3f8;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        img {
          width: 100%;
          height: 140px;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 10px;
          background: #eaeaea;
        }
        .info h3 {
          margin-bottom: 5px;
          font-size: 18px;
          color: #333;
        }
        .rating {
          font-weight: bold;
          color: #f5a623;
        }
      </style>
      <div class="card">
        <img src="${img}" alt="${name}" />
        <div class="info">
          <h3>Нэр: ${name}</h3>
          <p>Байршил: ${location}</p>
          <p class="rating">Үнэлгээ: ${rating}</p>
          <p>Гарах хоол: ${menu}</p>
          <p>Ачаалал: ${traf}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCard);