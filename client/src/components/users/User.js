import React from "react";
import Cars from "../cars/Cars";

const User = ({ user }) => {
  const { name, car } = user;

  return (
    <div>
      <h2>{name}</h2>
      <Cars cars={car} />
    </div>
  );
};

export default User;
