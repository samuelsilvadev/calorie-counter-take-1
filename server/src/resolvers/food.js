const { getAllFoodsQuery } = require("../services/allFoodsQuery");
const { getFoodByName } = require("../services/foodByName");
const { getFoodsByName } = require("../services/foodsByName");

const foodResolvers = {
  Query: {
    allFoods: () => getAllFoodsQuery(),
    foodByName: (_, { name }) => getFoodByName(name),
    foodsByName: (_, { name }) => getFoodsByName(name),
  },
};

module.exports = { foodResolvers };
