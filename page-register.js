class RegisterPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .register-section {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('./img/back.png') no-repeat center center;
          background-size: cover;
          position: relative;
          padding: 20px;
        }

        .register-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255, 255, 255, 0.3); 
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        #register-form {
          position: relative;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2.2rem 2rem;
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 380px; /* Presne rovnaké ako Login */
          color: #333;
          box-sizing: border-box;
        }

        h2 {
          text-align: center;
          font-size: 1.8rem;
          margin-bottom: 0.3rem;
          color: #ff6b35;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .subtitle {
          text-align: center;
          font-size: 0.85rem;
          color: #777;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        label {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #555;
          text-transform: uppercase;
        }

        input, select {
          width: 100%;
          padding: 0.75rem 0.9rem;
          background: rgba(255, 255, 255, 0.9);
          border: 1.5px solid #eee;
          border-radius: 12px;
          font-size: 0.9rem;
          color: #333;
          outline: none;
          box-sizing: border-box;
        }

        .submit-button {
          width: 100%;
          padding: 0.9rem;
          margin-top: 0.8rem;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #ff8c42 0%, #ff6b35 100%);
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 15px rgba(255, 107, 53, 0.2);
        }

        .login-link {
          text-align: center;
          margin-top: 1.2rem;
          font-size: 0.85rem;
          color: #666;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 1rem;
        }

        .login-link a {
          color: #ff6b35;
          text-decoration: none;
          font-weight: bold;
        }
      </style>

      <section class="register-section">
        <form id="register-form">
          <h2>Бүртгүүлэх</h2>
          <p class="subtitle">Мэдээллээ оруулна уу</p>
          
          <div class="form-group">
            <label>Төрөл</label>
            <select id="reg-role" required>
              <option value="user">Хэрэглэгч</option>
              <option value="owner">Бизнес эрхлэгч</option>
            </select>
          </div>

          <div class="form-group">
            <label id="name-label">Нэвтрэх нэр</label>
            <input type="text" id="reg-name" placeholder="Хэрэглэгчийн нэр" required>
          </div>

          <div class="form-group">
            <label>И-мэйл хаяг</label>
            <input type="email" id="reg-email" placeholder="mail@example.com" required>
          </div>

          <div class="form-group">
            <label>Нууц үг</label>
            <input type="password" id="reg-password" placeholder="••••••••" required>
          </div>

          <button type="submit" class="submit-button">Бүртгэл үүсгэх</button>

          <div class="login-link">
            Бүртгэлтэй юу? <a href="#/login">Нэвтрэх</a>
          </div>
        </form>
      </section>
    `;

    this.initLogic();
  }

  initLogic() {
    const roleSelect = this.querySelector("#reg-role");
    const nameLabel = this.querySelector("#name-label");
    const nameInput = this.querySelector("#reg-name");

    roleSelect.addEventListener("change", (e) => {
      if (e.target.value === "owner") {
        nameLabel.textContent = "Байгууллагын нэр";
        nameInput.placeholder = "Байгууллагын нэрээ оруулна уу";
      } else {
        nameLabel.textContent = "Нэвтрэх нэр";
        nameInput.placeholder = "Хэрэглэгчийн нэр";
      }
    });

    this.querySelector("#register-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const role = this.querySelector("#reg-role").value;
      const email = this.querySelector("#reg-email").value;
      const password = this.querySelector("#reg-password").value;
      try {
        const res = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password, role })
        });
        if (!res.ok) {
          alert("Бүртгэл амжилтгүй");
          return;
        }
        alert("Амжилттай бүртгэгдлээ!");
        window.location.hash = "#/login";
      } catch (err) {
        console.error(err);
        alert("Сервертэй холбогдож чадсангүй");
      }
    });

  }
}

customElements.define("register-page", RegisterPage);