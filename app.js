const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const keys = require("./config/key");

const models = require("./models"); // data
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//const me = models.users[0];

const server = new ApolloServer({
  typeDefs, // schema
  resolvers,
  context: {
    models,
    secret: keys.jwtSecret
    //me
  }
});

const app = express();
app.use(cors());
// now we can go to `http://localhost:5000/graphql` graphql playground
server.applyMiddleware({ app });

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Apollo GraphQL server is running on port ${PORT}`);
});
