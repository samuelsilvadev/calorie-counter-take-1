const { deserializeFoodCsv } = require("./utils/deserializeFoodCsv");

function getFoodByName(foodName) {
  const foods = deserializeFoodCsv();

  return foods.find((food) => food.name === foodName);
}

module.exports = { getFoodByName };
