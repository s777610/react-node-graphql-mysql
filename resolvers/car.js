const resolvers = {
  Query: {
    car: (parent, { id }, { models }) => models.cars.find(car => car.id === id),
    cars: (parent, args, { models }) => models.cars
  },
  Mutation: {
    createCar: (parent, { id, make, model, color }, { models }) => {
      const car = {
        id,
        make,
        model,
        color
      };
      models.cars.push(car);
      return car;
    },
    removeCar: (parent, { id }, { models }) => {
      let found = false;
      models.cars = models.cars.filter(car => {
        if (car.id === id) found = true;
        else return car;
      });
      if (found) return true;
      else return false;
    }
  },
  Car: {
    ownedBy: (parent, args, { models }) => {
      // parent is Car
      // console.log(parent); { id: 2, make: 'Honda', model: 'HRV', color: 'red', ownedBy: 1 }
      return models.users.find(user => user.id === parent.ownedBy);
    }
  }
};

module.exports = resolvers;
