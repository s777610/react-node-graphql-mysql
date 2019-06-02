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
    login(username: String, password: String!): Token!
    uploadImage(filename: String!): String!
  }

  # dont add password here
  type User {
    id: ID!
    name: String!
    username: String!
    photo: String
    car: [Car]
  }

  type Token {
    token: String!
  }
`;
