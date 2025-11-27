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
        }
        img {
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        .info {
          padding: 10px;
        }
      </style>
      <div class="card">
        <img src="${img}" alt="${name}">
        <div class="info">
          <h3>${name}</h3>
          <p>${location}</p>
          <p>${rating}</p>
        </div>
      </div>
    `;
  }
}

customElements.define("restaurant-card", RestaurantCard);

