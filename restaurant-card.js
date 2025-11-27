class RestaurantCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const location = this.getAttribute("location");
    const rating = this.getAttribute("rating");
    const img = this.getAttribute("img");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          margin: 10px;
          gap: 20px;
        }
        img {
          width: 250px;
          height: 200px;
          object-fit: cover;
          display: block;
          margin: 20px auto;
          border-radius: 1rem;
        }
        .info {
          padding: 10px;
          display: block;
          margin: 10px auto;
        }
        h3 {
        font-size: 12;
        }
      </style>
      <div class="card">
        <img src="${img}" alt="${name}">
        <div class="info">
          <h3>Нэр: ${name}</h3>
          <p>Байршил:${location}</p>
          <p>Үнэлгээ:${rating}</p>
          <p>Ачаалал: </p>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCard);

