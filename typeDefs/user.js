const { gql } = require("apollo-server-express");

// user schema
module.exports = gql`
  extend type Query {
    me: User
    user(id: Int!): User
    users: [User]
  }

  extend type Mutation {
    makeUser(name: String!): User!
    removeUser(id: Int!): Boolean
    register(name: String!, username: String!, password: String!): Boolean!
  }

  # dont add password here
  type User {
    id: ID!
    name: String!
    username: String!
    car: [Car]
  }
`;
