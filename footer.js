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
          /* CLS-ээс сэргийлж тогтмол өндөр зааж өгөх эсвэл min-height-ийг тодорхой болгох */
          min-height: 180px; 
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
          /* text-shadow-г анимэйшн биш тогтмол болгох нь гүйцэтгэлд сайн */
          text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        }

        .copyright-text {
          font-size: 0.85rem;
          opacity: 0.9;
          font-weight: 300;
        }

        .promo-text {
          margin-top: 1.5rem;
          font-size: 1.6rem;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.95);
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          text-align: center;
          border-top: 2px solid rgba(255,255,255,0.3);
          border-bottom: 2px solid rgba(255,255,255,0.3);
          padding: 8px 25px;

          /* Зөвхөн compositor ашиглах анимэйшн (transform болон opacity) */
          animation: moveUp 2s ease-out forwards;
          will-change: transform, opacity;
        }

        /* Гэрэлтэх эффект - left-ийн оронд transform ашиглав */
        .promo-text::after {
          content: '';
          position: absolute;
          top: 0; 
          left: 0;
          width: 70%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          /* transform: translateX ашиглах нь CLS үүсгэхгүй */
          animation: shine 2s infinite linear;
          will-change: transform;
        }

        /* CLS-ээс сэргийлсэн зөөлөн хөдөлгөөн */
        @keyframes moveUp {
          0% {
            transform: translateY(10px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Layout Shift үүсгэдэггүй shine анимэйшн */
        @keyframes shine {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(250%); }
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