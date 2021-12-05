const { gql } = require("apollo-server");
const { foodDefs } = require("./food");

const typeDefs = gql`
  ${foodDefs}

  type Query {
    allFoods: [Food]
  }
`;

module.exports = { typeDefs };
