class Footer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        footer {
          display: flex;
          flex-direction: column;
          padding: 3rem 10% 2rem 10%;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-family: 'Arial', sans-serif;
          box-shadow: 0 -4px 10px rgba(255, 107, 53, 0.4);
        }

        /* ЛОГО ХЭСЭГ */
        .footer-bottom {
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
      
        .logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0.9;
          text-align: center;
        }

        .logo-text {
          font-weight: 900;
          font-size: 2rem;
          letter-spacing: -1px;
        }

        .copyright-text {
          font-size: 0.85rem;
        }

        /* ТАНЫ АНИМЭЙШН ТЕКСТ */
        .promo-text {
          margin-top: 3rem;
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          text-shadow: 0 0 10px rgba(255,255,255,0.8),
                       0 0 20px rgba(255,140,66,0.8),
                       0 0 30px rgba(255,107,53,0.6);
          animation: epicGlow 4s ease-in-out infinite alternate;
        }

        @keyframes epicGlow {
          0% {
            transform: scale(1);
            color: #fff;
            text-shadow: 0 0 10px rgba(255,255,255,0.8),
                         0 0 20px rgba(255,140,66,0.8);
          }
          50% {
            transform: scale(1.1);
            color: #ffe082;
            text-shadow: 0 0 15px rgba(255,255,255,1),
                         0 0 40px rgba(255,140,66,0.8);
          }
          100% {
            transform: scale(1.05);
            color: #fff;
            text-shadow: 0 0 12px rgba(255,255,255,0.9),
                         0 0 35px rgba(255,107,53,0.7);
          }
        }
      </style>

      <footer>
        <div class="footer-bottom">
          <div class="logo-area">
            <div class="logo-text">ForkU</div>
            <span class="copyright-text">©2025 . Бүх эрх хуулиар хамгаалагдсан.</span>
          </div>
        </div>

        <p class="promo-text">Та хоолны бизнесийг базах цаг боллоо</p>
      </footer>
    `;
  }
}

customElements.define("footer-js", Footer);