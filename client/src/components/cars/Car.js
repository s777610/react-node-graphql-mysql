import React from "react";

const Car = ({ car }) => {
  const { make, model, color } = car;
  return <div>{`${make} ${model} ${color}`}</div>;
};

export default Car;
