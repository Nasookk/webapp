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
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
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
          font-size: 2rem;
        }
        .form-group { margin-bottom: 1.2rem; }
        label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #333; }
        input, select {
          width: 100%;
          padding: 0.85rem;
          border: 2px solid #ff8c42;
          border-radius: 8px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        .submit-button {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: 0.3s;
        }
        .submit-button:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(255,107,53,0.4); }
        .error-message { color: #ff4136; font-size: 0.9rem; margin-top: 5px; display: none; }
      </style>

      <section class="register-section">
        <form id="register-form">
          <h2>Бүртгүүлэх</h2>
          
          <div class="form-group">
            <label>Таны нэвтрэх төрөл?</label>
            <select id="reg-role" required>
              <option value="user">Хэрэглэгч</option>
              <option value="owner">Бизнес эрхлэгч</option>
            </select>
          </div>

          <div class="form-group">
            <label>Нэр:</label>
            <input type="text" id="reg-name" placeholder="Нэрээ оруулна уу" required>
          </div>

          <div class="form-group">
            <label>И-мэйл хаяг:</label>
            <input type="email" id="reg-email" placeholder="example@gmail.com" required>
          </div>

          <div class="form-group">
            <label>Нууц үг:</label>
            <input type="password" id="reg-password" placeholder="Нууц үг" required>
          </div>

          <div class="form-group">
            <label>Нууц үг давтах:</label>
            <input type="password" id="confirm-password" placeholder="Нууц үгээ дахин оруулна уу" required>
            <div id="error-msg" class="error-message">Нууц үг таарахгүй байна!</div>
          </div>

          <button type="submit" class="submit-button">Бүртгэл үүсгэх</button>
        </form>
      </section>
    `;

    this.initLogic();
  }

  initLogic() {
    const form = this.querySelector("#register-form");
    const roleInput = this.querySelector("#reg-role");
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

      const role = roleInput.value;
      alert(`Амжилттай бүртгэгдлээ! (${role === 'owner' ? 'Owner' : 'User'})`);
      
      // Role-оос хамаарч шилжих
      window.location.hash = role === "owner" ? "#/admin-dashboard" : "#/login";
    });
  }
}
customElements.define("register-page", RegisterPage);