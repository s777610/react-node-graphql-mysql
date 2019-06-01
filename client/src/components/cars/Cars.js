import React from "react";
import Car from "./Car";

const Cars = ({ cars }) => {
  return cars.length === 0 ? (
    <p>No Car</p>
  ) : (
    cars.map(car => {
      return <Car key={car.id} car={car} />;
    })
  );
};

export default Cars;
