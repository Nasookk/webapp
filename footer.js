class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        footer {
          display: flex;
          flex-direction: column;
          padding: 2rem 8%;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          border-top: 2px solid rgba(255,255,255,0.2);
          overflow: hidden;
          align-items: center;
          min-height: 80px;
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          text-align: center;
        }

        .logo-text {
          font-weight: 900;
          font-size: 1.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .copyright-text {
          font-size: 0.85rem;
          opacity: 0.9;
          font-weight: 300;
        }

        /* Хүчтэй анимэйшн */
        .promo-text {
          margin-top: 1.5rem;
          font-size: 1.6rem;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.95);
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          text-align: center;

          /* Нэгдсэн анимэйшн: дээш, тэлэлт, гэрэлтэх */
          animation: moveUp 2s ease-in-out infinite alternate,
                     glow 1.5s ease-in-out infinite alternate;
          border-top: 2px solid rgba(255,255,255,0.3);
          border-bottom: 2px solid rgba(255,255,255,0.3);
          padding: 8px 25px;
        }

        /* Гэрэлтэх эффект */
        .promo-text::after {
          content: '';
          position: absolute;
          top: 0; left: -150%;
          width: 70%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shine 2s infinite;
        }

        /* Хөдөлгөөн: дээшээ гарч, бага зэрэг тэлэлттэй */
        @keyframes moveUp {
          0% {
            transform: translateY(40px) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }

        /* Гэрэлтэх анимэйшн */
        @keyframes shine {
          0% { left: -150%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }

        /* Text glow */
        @keyframes glow {
          0% { text-shadow: 0 0 5px rgba(255,255,255,0.5); }
          50% { text-shadow: 0 0 25px rgba(255,255,255,1); }
          100% { text-shadow: 0 0 10px rgba(255,255,255,0.7); }
        }

        .divider {
          width: 50px;
          height: 3px;
          background-color: white;
          margin: 10px 0;
          border-radius: 2px;
        }
      </style>

      <footer>
        <div class="footer-content">
          <div class="logo-text">ForkU</div>
          <div class="divider"></div>
          <span class="copyright-text">©2025 . Бүх эрх хуулиар хамгаалагдсан.</span>
        </div>

        <p class="promo-text">Бизнесээ базах цаг...</p>
      </footer>
    `;
  }
}

customElements.define("footer-js", Footer);
