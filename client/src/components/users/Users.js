import React from "react";
import { Query } from "react-apollo";
import query from "../../query/query";

import User from "./User";

const Users = () => {
  return (
    <div>
      <Query query={query.users}>
        {({ data, loading }) => {
          if (loading) return <h2>Loading...</h2>;

          return data.users.map(user => {
            return <User key={user.id} user={user} />;
          });
        }}
      </Query>
    </div>
  );
};

export default Users;
