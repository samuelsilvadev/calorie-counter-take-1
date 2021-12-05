const { foodResolvers } = require("./food");

const resolvers = {
  Query: {
    ...foodResolvers.Query,
  },
};

module.exports = { resolvers };
