class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        footer {
          display: flex;
          flex-direction: column;
          padding: 1.5rem 8% 1rem 8%;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-family: 'Arial', sans-serif;
          box-shadow: 0 -6px 20px rgba(255, 107, 53, 0.6);
          border-top: 2px solid rgba(255,255,255,0.3);
          overflow: hidden; /* урсгал текст илүүдлийг далдлана */
        }

        .footer-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }

        .logo-text {
          font-weight: 900;
          font-size: 1.5rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          /* anivchdag/pulse-г устгасан */
        }

        .copyright-text {
          font-size: 0.7rem;
          opacity: 0.8;
        }

        /* Урсах motion */
        .promo-text {
          position: relative;
          margin-top: 1.2rem;
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: black;
          white-space: nowrap;          /* нэг мөрт */
          will-change: transform;
          text-shadow: 0 0 10px rgba(0,0,0,0.5),
                       0 0 20px rgba(255,140,66,0.8),
                       0 0 30px rgba(255,107,53,0.8);
          animation: flowX 12s linear infinite; /* жигд урсана */
        }

        @keyframes flowX {
          0%   { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      </style>

      <footer>
        <div class="footer-bottom">
          <div class="logo-area">
            <div class="logo-text">ForkU</div>
            <span class="copyright-text">©2025 . Бүх эрх хуулиар хамгаалагдсан.</span>
          </div>
        </div>

        <p class="promo-text">Бизнесээ базах цаг...</p>
      </footer>
    `;
  }
}

customElements.define("footer-js", Footer);