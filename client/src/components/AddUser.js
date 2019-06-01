import React, { useState } from "react";
// import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import query from "../query/query";

const AddUser = () => {
  const [name, setName] = useState("");

  const onSubmit = (e, makeUser) => {
    e.preventDefault();
    makeUser({
      variables: {
        name
      }
    });
    setName("");
  };

  return (
    // refetch query when mutation is done
    <Mutation
      mutation={query.addUser}
      refetchQueries={[
        {
          query: query.users
        }
      ]}
      awaitRefetchQueries={true}
    >
      {(makeUser, { loading, error }) => (
        <form onSubmit={e => onSubmit(e, makeUser)}>
          <label>
            <span>Name: </span>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <div>
            <button>Add User</button>
          </div>
          {loading && <p>Adding user...</p>}
          {error && <p>Error!</p>}
        </form>
      )}
    </Mutation>
  );
};

export default AddUser;
