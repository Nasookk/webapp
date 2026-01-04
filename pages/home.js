export function HomePage() {
  return `
    <search-bar></search-bar>
    <food-info-app 
      food-url="http://localhost:3000/api/foods"
      restaurant-url="http://localhost:3000/api/restaurants">
    </food-info-app>
  `;
}