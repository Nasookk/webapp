class RestaurantList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const restaurants = [
            {
                name: "Restaurant 1",
                location: "MUIS III",
                rating: "5/5",
                img: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?q=80&w=300&auto=format&fit=crop"
            },
            {
                name: "Restaurant 2",
                location: "MUIS II",
                rating: "4/5",
                img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=300&auto=format&fit=crop"
            },
            {
                name: "Restaurant 3",
                location: "MUIS I",
                rating: "4.5/5",
                img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300&auto=format&fit=crop"
            }
        ];

        this.shadowRoot.innerHTML = `
        <style>
            .restaurants-section {
                padding: 20px;
            }
            .restaurants-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                gap: 15px;
            }
            .card {
                background: #fff;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                transition: transform 0.2s ease;
            }
            .card:hover {
                transform: translateY(-5px);
            }
            .card img {
                width: 100%;
                height: 140px;
                object-fit: cover;
            }
            .card-info {
                padding: 10px;
            }
            h2 {
                margin-bottom: 15px;
            }
        </style>

        <div class="restaurants-section">
            <h2>Restaurants</h2>
            <div class="restaurants-grid">
                ${restaurants.map(r => `
                    <div class="card">
                        <img src="${r.img}" alt="${r.name}">
                        <div class="card-info">
                            <h3>${r.name}</h3>
                            <p>${r.location}</p>
                            <p class="rating">${r.rating}</p>
                        </div>
                    </div>
                `).join("")}
            </div>
        </div>
        `;
    }
}

customElements.define("restaurant-list", RestaurantList);
