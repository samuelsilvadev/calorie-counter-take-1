const { foodResolvers } = require("./food");

const resolvers = {
  Query: {
    ...foodResolvers.Query,
  },
  Mutation: {
    ...foodResolvers.Mutation,
  },
};

module.exports = { resolvers };
