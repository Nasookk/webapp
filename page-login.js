class LoginPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #fff5eb 0%, #ffe0cc 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .login-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
           }
        .login-section h2 {
          text-align: center;
          color: #ff6b35;
          margin-bottom: 1.5rem;
          font-size: 2rem;
          text-shadow: 1px 1px 3px rgba(255, 107, 53, 0.2);
        }
        #login-form {
          background: #fff;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .form-group {
          margin-bottom: 1.2rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #333;
        }
        input[type="text"],
        input[type="password"] {
          width: 100%;
          display: center;
          padding: 0.8rem 0.5rem;
          border: 2px solid #ff8c42;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 8px rgba(255, 107, 53, 0.4);
        }
        .login-button {
          width: 100%;
          padding: 0.9rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 107, 53, 0.4);
        }
        .register-link {
          text-align: center;
          margin-top: 1rem;
        }
        .register-link p {
          margin: 0.5rem 0;
          color: #555;
        }
        .register-button {
          display: inline-block;
          padding: 0.6rem 1.2rem;
          background: #fff;
          border: 2px solid #ff6b35;
          border-radius: 8px;
          color: #ff6b35;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .register-button:hover {
          background: #ff6b35;
          color: white;
        }
      </style>

      <section class="login-section">
        <form id="login-form">
          <div class="form-group">
            <label for="login-username-email">Хэрэглэгчийн нэр эсвэл И-мэйл:</label>
            <input type="text" id="login-username-email" placeholder="Хэрэглэгчийн нэр эсвэл И-мэйлээ оруулна уу" required>
          </div>

          <div class="form-group">
            <label for="login-password">Нууц үг:</label>
            <input type="password" id="login-password" placeholder="Нууц үгээ оруулна уу" required>
          </div>

          <button type="submit" class="login-button">Нэвтрэх</button>

          <div class="register-link">
            <p>Шинэ хэрэглэгч үү?</p>
            <a href="#/register" class="register-button">Бүртгүүлэх</a>
          </div>
        </form>
      </section>
    `;

    this.querySelector("#login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Амжилттай нэвтэрлээ!");
    });
  }
}

customElements.define("login-page", LoginPage);
