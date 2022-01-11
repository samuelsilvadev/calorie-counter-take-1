const cache = require("memory-cache");
const { getFoodByCode } = require("./foodByCode");

const CACHE_KEY = "__favorite-foods__";

function unMarkFoodAsFavorite(foodCode, userId) {
  const food = getFoodByCode(foodCode);

  if (!food) {
    return null;
  }

  const favoriteFoods = cache.get(CACHE_KEY);

  if (!favoriteFoods) {
    return null;
  }

  const updatedFavoriteFoods = favoriteFoods[userId].filter(
    (food) => food.code !== foodCode
  );

  favoriteFoods[userId] = updatedFavoriteFoods;

  cache.put(CACHE_KEY, favoriteFoods);

  return food;
}

module.exports = { unMarkFoodAsFavorite };
