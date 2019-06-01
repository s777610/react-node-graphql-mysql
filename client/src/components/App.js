import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Users from "./users/Users";
import AddUser from "./AddUser";

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <h1>GraphQL App</h1>

      <AddUser />
      <hr />
      <Users />
    </ApolloProvider>
  );
};

export default App;
