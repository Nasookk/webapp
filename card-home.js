class HomeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "Нэр байхгүй";
    const price = this.getAttribute("price") || "0₮";
    const rating = this.getAttribute("rating") || "0.0";
    const ingredients = this.getAttribute("ingredients") || "N/A";
    const calories = this.getAttribute("calories") || "N/A";
    const img = this.getAttribute("img") || "https://via.placeholder.com/300x200";
    const location = this.getAttribute("location") || "Тодорхойгүй";

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        /* FoodCard-ийн яг ижил CSS */
        .card {
          background: #f3f3f8;
          border-radius: 10px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          font-family: sans-serif;
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
          margin: 0 0 5px 0;
          font-size: 18px;
          color: #333;
        }
          .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;           
          padding: 40px 10%;   
      }
        .info p {
          margin: 3px 0;
          font-size: 14px;
          color: #555;
        }
        .rating {
          font-weight: bold;
          color: #f5a623;
        }

        /* Dialog/Popup стиль */
        dialog {
          border: none;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.3);
          width: 300px;
          text-align: left;
        }
        dialog::backdrop {
          background: rgba(0,0,0,0.5);
        }
        .close-btn {
          background: #ff4136;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }
      </style>

      <div class="card">
        <img src="${img}" alt="${name}" />
        <div class="info">
          <h3>Нэр: ${name}</h3>
          <p>Үнэ: ${price}</p>
          <p class="rating">Үнэлгээ: ${rating}</p>
          <p>Орц: ${ingredients}</p>
          <p>Калори: ${calories}</p>
        </div>
      </div>

      <dialog id="foodDialog">
        <img src="${img}" style="height:120px" />
        <h2 style="margin: 10px 0">${name}</h2>
        <p><strong>Байршил:</strong> ${location}</p>
        <p><strong>Орц:</strong> ${ingredients}</p>
        <p><strong>Калори:</strong> ${calories}</p>
        <button id="closeBtn" class="close-btn">Хаах</button>
      </dialog>
    `;

    // Эвентүүдээ энд холбоно
    const card = this.shadowRoot.querySelector(".card");
    const dialog = this.shadowRoot.querySelector("#foodDialog");
    const closeBtn = this.shadowRoot.querySelector("#closeBtn");

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