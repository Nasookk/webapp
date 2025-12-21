class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          text-align: center;
          box-shadow: 0 -4px 6px rgba(255, 107, 53, 0.3);
        }
        footer p {
          margin-top: 0.5rem;
          font-size: 1.1rem;
          font-weight: 600;
        }
      </style>

      <footer>
        <div>© 2025 Your Website. All rights reserved.</div>
        <p>Та хоолны бизнесийг базах цаг боллоо</p>
      </footer>
    `;
  }
}

customElements.define("footer-js", Footer);