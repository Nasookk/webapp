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
          padding: 2rem;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          text-align: center;
          box-shadow: 0 -4px 10px rgba(255, 107, 53, 0.4);
        }
        footer div {
          font-size: 1.2rem;
          font-weight: 500;
        }
        footer p {
          margin-top: 1rem;
          font-size: 2.2rem; /* том болгосон */
          font-weight: 800;   /* илүү зузаан */
          letter-spacing: 2px;
          text-transform: uppercase;
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
                         0 0 20px rgba(255,140,66,0.8),
                         0 0 30px rgba(255,107,53,0.6);
          }
          50% {
            transform: scale(1.1); /* бага зэрэг томорно */
            color: #ffe082;
            text-shadow: 0 0 15px rgba(255,255,255,1),
                         0 0 25px rgba(255,200,100,0.9),
                         0 0 40px rgba(255,140,66,0.8);
          }
          100% {
            transform: scale(1.05);
            color: #fff;
            text-shadow: 0 0 12px rgba(255,255,255,0.9),
                         0 0 22px rgba(255,140,66,0.9),
                         0 0 35px rgba(255,107,53,0.7);
          }
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