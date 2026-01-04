class Header extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();

    window.addEventListener("hashchange", () => {
      this.render();
      this.attachEvents();
    });
  }

  render() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isOwner = token && role === 'owner';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; width: 100%; }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          box-shadow: 0 4px 6px rgba(255, 107, 53, 0.3);
        }
        .logo img { height: 45px; }
        nav ul { display: flex; list-style: none; gap: 1.5rem; align-items: center; }
        nav a {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          transition: 0.25s;
        }
        nav a:hover { background: rgba(255,255,255,0.25); }
        
        /* Dashboard товчны онцгой загвар */
        .dashboard-btn {
          background: rgba(255,255,255,0.2);
          border: 1px solid white;
        }
      </style>

      <header>
        <div class="logo">
          <a href="#/">
            <img src="img/logo.webp" alt="Logo"/>
          </a>
        </div>

        <nav>
          <ul>
            <li><a href="#/"><span>Home</span></a></li>
            <li><a href="#/food"><span>Foods</span></a></li>
            <li><a href="#/restaurant"><span>Restaurants</span></a></li>
            ${isOwner ? `
              <li><a href="#/owner" class="dashboard-btn"><span>My restaurants</span></a></li>
            ` : ""}
            ${token
              ? `<li><a href="#/logout" id="logout-link"><span>Log out</span></a></li>`
              : `<li><a href="#/login"><span>Log in</span></a></li>`
            }
          </ul>
        </nav>
      </header>
    `;
  }

  attachEvents() {
    const logoutLink = this.shadowRoot.querySelector("#logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("role"); 
        
        window.location.hash = "/login";
        this.render();
        this.attachEvents();
      });
    }
  }
}

customElements.define("header-js", Header);