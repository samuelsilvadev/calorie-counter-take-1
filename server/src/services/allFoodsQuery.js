const { loadFoodFacade } = require("./loadFoodFacade");

function getAllFoodsQuery() {
  return loadFoodFacade();
}

module.exports = { getAllFoodsQuery };
