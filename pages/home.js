export function HomePage() {
  return `
    <search-bar></search-bar>
    <food-info-app 
    food-url="./data-home-page-food.json"
    restaurant-url="./data-home-page-restaurant.json">
    </food-info-app>
  `;
}
    // food-url="http://localhost:3000/api/foods"
    // restaurant-url="http://localhost:3000/api/restaurants">