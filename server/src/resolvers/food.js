const { getAllFoodsQuery } = require("../services/allFoodsQuery");
const { getFoodByName } = require("../services/foodByName");
const { getFoodByCode } = require("../services/foodByCode");
const {
  getFoodsByName,
  getPaginatedFoodsByName,
} = require("../services/foodsByName");
const { markFoodAsFavorite } = require("../services/markFoodAsFavorite");
const { getFavoriteFoodByUser } = require("../services/getFavoriteFoodsByUser");

const foodResolvers = {
  Query: {
    allFoods: () => getAllFoodsQuery(),
    foodByName: (_, { name }) => getFoodByName(name),
    foodByCode: (_, { code }) => getFoodByCode(code),
    foodsByName: (_, { name }) => getFoodsByName(name),
    paginatedFoodsByName: (_, { name, pageSize, pageNumber }) =>
      getPaginatedFoodsByName({ foodName: name, pageSize, pageNumber }),
    allFavoriteFoodsByUser: (_, { userId }) => getFavoriteFoodByUser(userId),
  },
  Mutation: {
    markFoodAsFavorite: (_, { code, userId }) =>
      markFoodAsFavorite(code, userId),
  },
};

module.exports = { foodResolvers };
