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
    this.shadowRoot.innerHTML = `
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

        @media (max-width: 768px) {
          #app {
            padding-bottom: 80px;
          }
          :host {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 1000;
          }
          header {
            padding: 0;
            height: 64px;
            box-shadow: 0 -4px 10px rgba(0,0,0,0.15);
          }
          nav {
            width: 100%;
          }
          nav ul {
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
            gap: 0;
            height: 100%;
          }
          nav li {
            flex: 1;
            text-align: center;
          }
          nav a {
            font-size: 12px;
            padding: 6px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }
        }
      </style>

      <header>
        <div class="logo">
          <a href="#/">
            <img src="img/logo.png" alt="Logo"/>
          </a>
        </div>

        <nav>
          <ul>
            <li><a href="#/"><span>Home</span></a></li>
            <li><a href="#/food"><span>Foods</span></a></li>
            <li><a href="#/restaurant"><span>Restaurants</span></a></li>
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
        window.location.hash = "/login";
        this.render();
        this.attachEvents();
      });
    }

  }
}

customElements.define("header-js", Header);
