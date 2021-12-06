const { gql } = require("apollo-server");

const foodDefs = gql`
  type Food {
    code: ID!
    name: String!
    portion: Int!
    portionAmount: Float!
    portionDisplayName: String!
    factor: Float!
    increment: Float!
    multiplier: Float!
    grains: Float!
    wholeGrains: Float!
    vegetables: Float!
    orangeVegetables: Float!
    darkGreenVegetables: Float!
    starchyVegetables: Float!
    otherVegetables: Float!
    fruits: Float!
    milk: Float!
    meats: Float!
    soy: Float!
    dryBeansPeas: Float!
    oils: Float!
    solidFats: Float!
    addedSugars: Float!
    alcohol: Float!
    calories: Float!
    saturatedFats: Float!
  }
`;

module.exports = { foodDefs };
