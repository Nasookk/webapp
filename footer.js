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
          background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%);
          color: white;
          text-align: center;
          box-shadow: 0 -4px 6px rgba(255, 107, 53, 0.3);
        }
        .ads {
          margin-top: 1rem;
          background: white;
          color: #333;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      </style>

      <footer>
        <div>© 2025 ForkU. All rights reserved.</div>
      </footer>
    `;
  }
}

customElements.define("footer-js", Footer);