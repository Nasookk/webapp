class HomeCard extends HTMLElement {
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
        :host {
          display: block;
          width: 100%;
          min-width: 0;
        }
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

        .details_button {
          margin-top: 10px;
          background-color: #f5a623;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .details_button:hover {
          background-color: #e59400;
        }

        dialog {
          border: none;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease;
          max-width: 300px;
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0.4);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        #closeDialog {
          margin-top: 10px;
          background: #d33;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
        }

        #closeDialog:hover {
          background: #a00;
        }
      </style>

      <div class="card">
        <img src="${img}" alt="${name}" />
        <div class="card-info">
          <h3>Нэр:${name}</h3>
          ${price ? `<p>Үнэ: ${price}</p>` : ""}
          ${location ? `<p>Байршил:${location}</p>` : ""}
          ${rating ? `<p class="rating">Үнэлгээ: ${rating}</p>` : ""}
        </div>

        <button class="details_button">Details</button>

        <dialog id="myDialog">
          <h3>${name}</h3>
          <img src="${img}" alt="${name}" style="width:100%; border-radius:8px;" />
          <p><strong>Үнэ:</strong> ${price || "N/A"}</p>
          <p><strong>Байршил:</strong> ${location || "N/A"}</p>
          <p><strong>Орц:</strong> ${ingredients}</p>
          <p><strong>Калори:</strong> ${calories}</p>
          <button id="closeDialog">Close</button>
        </dialog>
      </div>
    `;
  }

  connectedCallback() {
    const dialog = this.shadowRoot.querySelector("#myDialog");
    const openBtn = this.shadowRoot.querySelector(".details_button");
    const closeBtn = this.shadowRoot.querySelector("#closeDialog");
    openBtn.addEventListener("click", () => dialog.showModal());
    closeBtn.addEventListener("click", () => dialog.close());
  }
}

customElements.define("card-home", HomeCard);
