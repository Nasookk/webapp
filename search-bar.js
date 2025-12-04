class SearchBar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const css=`
        <style>
          .search-bar {
          display: flex;
          gap: 1rem;
          max-width: 900px;
          margin: 2rem auto;
          padding: 0 1rem;
          flex-wrap: wrap;
        }

        #searchInput {
          flex: 1;
          min-width: 250px;
          padding: 1rem 1.5rem;
          border: 2px solid #ff8c42;
          border-radius: 50px;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(255, 140, 66, 0.15);
          transition: all 0.3s ease;
        }

        #searchInput:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.25);
          transform: translateY(-2px);
        }

        #locationSelect {
          padding: 1rem 1.5rem;
          border: 2px solid #ff8c42;
          border-radius: 50px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 140, 66, 0.15);
          transition: all 0.3s ease;
          min-width: 180px;
          color: #ff6b35;
          font-weight: 500;
        }

        #locationSelect:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.25);
        }

        #searchBtn {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
          transition: all 0.3s ease;
        }

        #searchBtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.5);
          background: linear-gradient(135deg, #ff9d5c 0%, #ff7c45 100%);
        }

        #searchBtn:active {
          transform: translateY(0);
        }
        </style>
        `;
        this.shadowRoot.innerHTML = `
            ${css}
            <div class="search-bar">
                <input id="searchInput" type="text" placeholder="Search...">

            <select id="locationSelect">
                <option value="">All Locations</option>
                <option value="MUIS I">MUIS I</option>
                <option value="MUIS II">MUIS II</option>
                <option value="MUIS III">MUIS III</option>
                <option value="MUIS IV">MUIS IV</option>
            </select>

                <button id="searchBtn">Search</button>
            </div>
        `;
    }
}
customElements.define("search-bar", SearchBar);