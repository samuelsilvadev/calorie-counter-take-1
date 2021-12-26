const { loadFoodFacade } = require("./loadFoodFacade");

function getFoodByCode(foodCode) {
  const foods = loadFoodFacade();

  return foods.find((food) => food.code === foodCode);
}

module.exports = { getFoodByCode };
