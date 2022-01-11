const cache = require("memory-cache");
const { getFoodByCode } = require("./foodByCode");
const { removeDuplicates } = require("./utils/removeDuplicates");

const CACHE_KEY = "__favorite-foods__";

function markFoodAsFavorite(foodCode, userId) {
  const food = getFoodByCode(foodCode);

  if (!food) {
    return null;
  }

  const favoriteFoods = cache.get(CACHE_KEY);

  if (!favoriteFoods) {
    cache.put(CACHE_KEY, {
      [userId]: [food],
    });
  } else {
    const updatedFavoriteFoods = [...favoriteFoods[userId], food];
    const foodsWithoutDuplicates = removeDuplicates(updatedFavoriteFoods);

    favoriteFoods[userId] = foodsWithoutDuplicates;

    cache.put(CACHE_KEY, favoriteFoods);
  }

  return food;
}

module.exports = { markFoodAsFavorite };
