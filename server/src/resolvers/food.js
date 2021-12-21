const { getAllFoodsQuery } = require("../services/allFoodsQuery");
const { getFoodByName } = require("../services/foodByName");
const {
  getFoodsByName,
  getPaginatedFoodsByName,
} = require("../services/foodsByName");

const foodResolvers = {
  Query: {
    allFoods: () => getAllFoodsQuery(),
    foodByName: (_, { name }) => getFoodByName(name),
    foodsByName: (_, { name }) => getFoodsByName(name),
    paginatedFoodsByName: (_, { name, pageSize, pageNumber }) =>
      getPaginatedFoodsByName({ foodName: name, pageSize, pageNumber }),
  },
};

module.exports = { foodResolvers };
