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
    const traf =this.getAttribute("traf");
    const img = this.getAttribute("img");
    

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          margin: 5px;
          gap: 20px;
          transition: transform 0.2s ease;
        }
        img {
          width: 250px;
          height: 200px;
          object-fit: cover;
          display: block;
          margin: 20px auto;
          border-radius: 1rem;
        }
        .card:hover {
          transform: translateY(-10px);
        }
        .card-info {
          padding: 10px;
        }
        .info {
          padding: 10px;
          display: block;
          margin: 10px auto;
        }
        h3 {
        font-size: 12px;
        }
      </style>
      <div class="card">
        <img src="${img}" alt="${name}">
        <div class="info">
          <h3>Нэр: ${name}</h3>
          <p>Байршил:${location}</p>
          <p>Үнэлгээ:${rating}</p>
          <p>Гарах хоол:${menu}</p>
          <p>Ачаалал:${traf}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCard);

