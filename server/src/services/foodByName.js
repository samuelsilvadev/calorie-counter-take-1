const { loadFoodFacade } = require("./loadFoodFacade");

function getFoodByName(foodName) {
  const foods = loadFoodFacade();

  return foods.find((food) => food.name === foodName);
}

module.exports = { getFoodByName };
