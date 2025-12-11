class Header extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    
    shadow.innerHTML =`
      <style>
        :host {
          display: block;
          width: 100%;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          box-shadow: 0 4px 6px rgba(255, 107, 53, 0.3);
        }

        .logo img {
          height: 45px;
        }

        nav ul {
          display: flex;
          list-style: none;
          gap: 1.5rem;
        }

        nav a {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          transition: 0.25s;
        }

        nav a:hover {
          background: rgba(255,255,255,0.25);
        }

        @media (max-width: 700px) {
          header {
            flex-direction: column;
            gap: 1rem;
          }

          nav ul {
            flex-direction: column;
            text-align: center;
            gap: .5rem;
          }
        }
      </style>

      <header>
        <div class="logo">
          <a href="#/">
            <img src="logo.png" alt="Logo"/>
          </a>
        </div>

        <nav>
          <ul>
            <a href="#/">Home</a>
            <a href="#/food">Foods</a>
            <a href="#/restaurant">Restaurants</a>
          </ul>
        </nav>
      </header>
    `;
  }
}

customElements.define("header-js", Header);
