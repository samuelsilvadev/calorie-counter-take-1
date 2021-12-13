const { loadFoodFacade } = require("./loadFoodFacade");

function getFoodsByName(foodName) {
  const foods = loadFoodFacade();

  return foods.filter((food) =>
    food.name.toLowerCase().includes(foodName.toLowerCase())
  );
}

module.exports = { getFoodsByName };
