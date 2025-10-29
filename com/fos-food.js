class FosFood extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
      const price=this.getAttribute("une") || "0";
      const ner=this.getAttribute("fname") || "Noname";
      const rating=this.getAttribute("unelgee") || "Norating";
      const orts=this.getAttribute("forts") || "Ortsgui";
      const zurag=this.getAttribute("photo") || "Zuraggui";

      this.innerHTML=`
        <article class="card">
          <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop" alt="${fname}"/>
          <div class="card-info">
            <h3>${ner}</h3>
            ${ price!="0"? `<p>Үнэ: ${price}₮</p>`:''}
            <p class="rating">${rating}/5</p>
          </div>
          <button class="details_button">Details</button>
          <div class="popover">
            <p><strong>Орц:</strong>${orts}</p>
            <p><strong>Калори:</strong> ~260 ккал</p>
          </div>
        </article>`;
    
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, oldVal, newVal) {
    }

    adoptedCallback() {
    }

}

window.customElements.define('fos-food', FosFood);