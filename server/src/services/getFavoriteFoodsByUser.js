const cache = require("memory-cache");

const CACHE_KEY = "__favorite-foods__";

function getFavoriteFoodByUser(userId) {
  const allFavoriteFoods = cache.get(CACHE_KEY);

  if (!allFavoriteFoods) {
    return null;
  }

  return allFavoriteFoods[userId];
}

module.exports = { getFavoriteFoodByUser };
