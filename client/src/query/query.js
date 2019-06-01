import gql from "graphql-tag";

const users = gql`
  query {
    users {
      id
      name
      car {
        id
        make
        model
        color
      }
    }
  }
`;

const addUser = gql`
  mutation makeUser($name: String!) {
    makeUser(name: $name) {
      id
      name
      car {
        make
      }
    }
  }
`;

export default { users, addUser };
