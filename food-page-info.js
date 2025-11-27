class FoodCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const name = this.getAttribute("name") || "Unknown Food";
    const location = this.getAttribute("location") || "";
    const price = this.getAttribute("price") || "";
    const rating = this.getAttribute("rating") || "";
    const img =
      this.getAttribute("img") || "https://source.unsplash.com/300x200/?food";
    const ingredients = this.getAttribute("ingredients") || "N/A";
    const calories = this.getAttribute("calories") || "N/A";

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background-color: #f3f3f8;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        img {
          width: 100%;
          height: 140px;
          border-radius: 10px;
          object-fit: cover;
          margin-bottom: 10px;
          background: #eaeaea;
        }

        .card-info h3 {
          margin-bottom: 5px;
          font-size: 18px;
          color: #333;
        }

        .rating {
          font-weight: bold;
          color: #f5a623;
        }

        .ingredients {
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>

      <div class="card">
        <img src="${img}" alt="${name}" />
        <div class="card-info">
          <h3>${name}</h3>
          ${price ? `<p>Үнэ: ${price}</p>` : ""}
          ${location ? `<p>${location}</p>` : ""}
          ${ingredients ? `<p class="ingredients">Орц<br> ${ingredients}</p>` : ""}
          ${calories ? `<p class="calories">Калори<br> ${calories}</p>` : ""}
          ${rating ? `<p class="rating">Rating: ${rating}</p>` : ""}
        </div>
      </div>
    `;
  }

//   connectedCallback() {
//     const dialog = this.shadowRoot.querySelector("#myDialog");
//     const openBtn = this.shadowRoot.querySelector(".details_button");
//     const closeBtn = this.shadowRoot.querySelector("#closeDialog");
//   }
}

customElements.define("food-card", FoodCard);
