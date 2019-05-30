const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const models = require("./models"); // data
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

//const me = models.users[0];

const server = new ApolloServer({
  typeDefs, // schema
  resolvers,
  context: {
    models
    //me
  }
});

const app = express();
// now we can go to `http://localhost:3000/graphql` graphql playground
server.applyMiddleware({ app });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Apollo GraphQL server is running on port ${PORT}`);
});
