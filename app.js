const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const keys = require("./config/key");
const jwt = require("jsonwebtoken");

const models = require("./models"); // data
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//const me = models.users[0];

const getLoggedInUser = req => {
  const token = req.headers["x-auth-token"];
  if (token) {
    try {
      // return user obj
      return jwt.verify(token, keys.jwtSecret);
    } catch (err) {
      throw new Error("Session expired");
    }
  }
};

const server = new ApolloServer({
  typeDefs, // schema
  resolvers,
  context: ({ req }) => ({
    models,
    secret: keys.jwtSecret,
    me: getLoggedInUser(req)
  })
});

const app = express();
app.use(cors());
// now we can go to `http://localhost:5000/graphql` graphql playground
server.applyMiddleware({ app });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Apollo GraphQL server is running on port ${PORT}`);
});
