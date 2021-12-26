const { gql } = require("apollo-server");
const { foodDefs } = require("./food");

const typeDefs = gql`
  ${foodDefs}

  type Query {
    allFoods: [Food]
    foodByCode(code: Int!): Food
    foodByName(name: String!): Food
    foodsByName(name: String!): [Food]!
    paginatedFoodsByName(
      name: String!
      pageSize: Int!
      pageNumber: Int!
    ): PaginatedFoods
  }
`;

module.exports = { typeDefs };
