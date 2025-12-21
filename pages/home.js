export function HomePage() {
  return `
    <search-bar></search-bar>
    <food-info-app 
    food-url="./data-home-page-food.json"
    restaurant-url="./data-home-page-restaurant.json">
    </food-info-app>
  `;
}
