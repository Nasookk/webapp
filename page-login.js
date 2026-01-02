class LoginPage extends HTMLElement {
  connectedCallback() {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.hash = "/";
      return;
    }
    this.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .login-section {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('./img/back.png') no-repeat center center;
          position: relative;
          padding: 20px;
        }

        .login-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255, 255, 255, 0.3); 
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        #login-form {
          position: relative;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 2.2rem 2rem; /* Жижигсгэсэн зай */
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          width: 100%;
          max-width: 380px; /* Register-тэй яг ижил өргөн */
          color: #333;
          box-sizing: border-box;
        }

        h2 {
          text-align: center;
          font-size: 1.8rem; /* Жижигсгэсэн гарчиг */
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
          margin-bottom: 1rem; /* Нягтаршуулсан зай */
        }

        label {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 0.75rem; /* Жижигсгэсэн label */
          font-weight: 700;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        input {
          width: 100%;
          padding: 0.75rem 0.9rem; /* Жижигсгэсэн input өндөр */
          background: rgba(255, 255, 255, 0.9);
          border: 1.5px solid #eee;
          border-radius: 12px;
          font-size: 0.9rem; /* Жижигсгэсэн текст */
          color: #333;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        input::placeholder {
          color: #bbb;
        }

        input:focus {
          background: #fff;
          border-color: #ff6b35;
          box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
        }

        .login-button {
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
          transition: all 0.3s ease;
          box-shadow: 0 8px 15px rgba(255, 107, 53, 0.2);
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 20px rgba(255, 107, 53, 0.3);
        }

        .register-link {
          text-align: center;
          margin-top: 1.2rem;
          font-size: 0.85rem;
          color: #666;
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 1rem;
        }

        .register-link a {
          color: #ff6b35;
          text-decoration: none;
          font-weight: bold;
        }
      </style>

      <section class="login-section">
        <form id="login-form">
          <h2>Нэвтрэх</h2>
          <p class="subtitle">Амтлаг бүхний ертөнцөд тавтай морил</p>

          <div class="form-group">
            <label for="login-id">Нэвтрэх нэр</label>
            <input type="text" id="login-id" placeholder="Нэр эсвэл и-мэйл" required>
          </div>

          <div class="form-group">
            <label for="login-password">Нууц үг</label>
            <input type="password" id="login-password" placeholder="••••••••" required>
          </div>

          <button type="submit" class="login-button">Нэвтрэх</button>

          <div class="register-link">
            Шинэ хэрэглэгч үү? <a href="#/register">Бүртгэл үүсгэх</a>
          </div>
        </form>
      </section>
    `;

    this.querySelector("#login-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = this.querySelector("#login-id").value;
      const password = this.querySelector("#login-password").value;
      try {
        const res = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
          alert("Нэвтрэх нэр эсвэл нууц үг буруу");
          return;
        }
        const data = await res.json();
        localStorage.setItem("token", data.token);
        window.location.hash = "/";
      } catch (err) {
        console.error(err);
        alert("Сервертэй холбогдож чадсангүй");
      }
    });


  }
}

customElements.define("login-page", LoginPage);