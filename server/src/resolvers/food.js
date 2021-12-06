const { getAllFoodsQuery } = require("../services/allFoodsQuery");

const foodResolvers = {
  Query: {
    allFoods: getAllFoodsQuery,
  },
};

module.exports = { foodResolvers };
