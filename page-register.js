class RegisterPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
      :host {
          display: block;
          background: linear-gradient(135deg, #ffffff 0%, #fff5eb 100%);
          min-height: 100vh;
        }
        .register-section {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          background: linear-gradient(135deg, #fff5eb 0%, #ffe0cc 100%);
          min-height: 90vh;
        }

        #register-form {
          background: #fff;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 450px;
        }

        #register-form h2 {
          text-align: center;
          color: #ff6b35;
          margin-bottom: 1.5rem;
          font-size: 2.2rem;
          font-weight: 800;
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

        input {
          width: 100%;
          padding: 0.85rem;
          border: 2px solid #ff8c42;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        input:focus {
          outline: none;
          border-color: #ff6b35;
          box-shadow: 0 0 8px rgba(255, 107, 53, 0.3);
        }

        .submit-button {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 107, 53, 0.4);
        }

        .login-link {
          text-align: center;
          margin-top: 1.5rem;
        }

        .login-link p {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .back-to-login {
          display: inline-block;
          padding: 0.6rem 1.5rem;
          background: #fff;
          border: 2px solid #ff6b35;
          border-radius: 8px;
          color: #ff6b35;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .back-to-login:hover {
          background: #ff6b35;
          color: white;
        }

        .error-message {
          color: #ff4136;
          font-size: 0.9rem;
          margin-top: 5px;
          display: none;
        }
      </style>

      <section class="register-section">
        <form id="register-form">
          <h2>Бүртгүүлэх</h2>
          
          <div class="form-group">
            <label for="reg-name">Нэр:</label>
            <input type="text" id="reg-name" placeholder="Өөрийн нэрээ оруулна уу" required>
          </div>

          <div class="form-group">
            <label for="reg-email">И-мэйл хаяг:</label>
            <input type="email" id="reg-email" placeholder="example@gmail.com" required>
          </div>

          <div class="form-group">
            <label for="reg-password">Нууц үг:</label>
            <input type="password" id="reg-password" placeholder="Нууц үг зохионо уу" required>
          </div>

          <div class="form-group">
            <label for="confirm-password">Нууц үг давтах:</label>
            <input type="password" id="confirm-password" placeholder="Нууц үгээ дахин оруулна уу" required>
            <div id="error-msg" class="error-message">Нууц үг таарахгүй байна!</div>
          </div>

          <button type="submit" class="submit-button">Бүртгэл үүсгэх</button>

          <div class="login-link">
            <p>Бүртгэлтэй юу?</p>
            <a href="#/login" class="back-to-login">Нэвтрэх</a>
          </div>
        </form>
      </section>
    `;

    this.initLogic();
  }

  initLogic() {
    const form = this.querySelector("#register-form");
    const passInput = this.querySelector("#reg-password");
    const confirmInput = this.querySelector("#confirm-password");
    const errorMsg = this.querySelector("#error-msg");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (passInput.value !== confirmInput.value) {
        errorMsg.style.display = "block";
        confirmInput.style.borderColor = "#ff4136";
        return;
      }

      errorMsg.style.display = "none";
      alert("Бүртгэл амжилттай боллоо!");
      window.location.hash = "/login"; // Бүртгүүлсний дараа Login руу шилжинэ
    });
  }
}

customElements.define("register-page", RegisterPage);