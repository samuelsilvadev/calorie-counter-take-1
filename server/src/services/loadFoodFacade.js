const cache = require("memory-cache");
const { deserializeFoodCsv } = require("./utils/deserializeFoodCsv");
const { removeDuplicates } = require("./utils/removeDuplicates");

const CACHE_KEY = "__foods__";

function loadFoodFacade() {
  const cachedFoods = cache.get(CACHE_KEY);

  if (cachedFoods) {
    return cachedFoods;
  }

  const foods = deserializeFoodCsv();
  const foodsWithoutDuplicates = removeDuplicates(foods);

  cache.put(CACHE_KEY, foodsWithoutDuplicates);

  return foods;
}

module.exports = { loadFoodFacade };
