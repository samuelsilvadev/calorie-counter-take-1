const cache = require("memory-cache");
const { deserializeFoodCsv } = require("./utils/deserializeFoodCsv");

const CACHE_KEY = "__foods__";

function loadFoodFacade() {
  const cachedFoods = cache.get(CACHE_KEY);

  if (cachedFoods) {
    return cachedFoods;
  }

  const foods = deserializeFoodCsv();

  cache.put(CACHE_KEY, foods);

  return foods;
}

module.exports = { loadFoodFacade };
