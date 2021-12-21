const { loadFoodFacade } = require("./loadFoodFacade");

function getFoodsByName(foodName) {
  const foods = loadFoodFacade();

  return foods.filter((food) =>
    food.name.toLowerCase().includes(foodName.toLowerCase())
  );
}

function getPaginatedFoodsByName({ foodName, pageSize, pageNumber }) {
  const foods = getFoodsByName(foodName);

  const countPages = Math.ceil(foods.length / pageSize);
  const startPoint = (pageNumber - 1) * pageSize;
  const endpoint = startPoint + pageSize;

  return {
    countPages,
    foods: foods.slice(startPoint, endpoint),
  };
}

module.exports = { getFoodsByName, getPaginatedFoodsByName };
