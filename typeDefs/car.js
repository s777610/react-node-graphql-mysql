const { gql } = require("apollo-server-express");

// car schema
module.exports = gql`
  extend type Query {
    car(id: Int!): Car
    cars: [Car]
  }

  extend type Mutation {
    createCar(make: String!, model: String, color: String!): Car!
    removeCar(id: Int!): Boolean
  }

  type Car {
    id: ID!
    make: String!
    model: String!
    color: String!
    ownedBy: User!
  }
`;
