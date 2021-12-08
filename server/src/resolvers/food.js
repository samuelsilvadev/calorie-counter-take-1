const { getAllFoodsQuery } = require("../services/allFoodsQuery");
const { getFoodByName } = require("../services/foodByName");

const foodResolvers = {
  Query: {
    allFoods: () => getAllFoodsQuery(),
    foodByName: (_, { name }) => getFoodByName(name),
  },
};

module.exports = { foodResolvers };
