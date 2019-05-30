const resolvers = {
  Query: {
    car: (parent, { id }, { models }) => models.Car.findByPk(id),
    cars: (parent, args, { models }) => models.Car.findAll()
  },
  Mutation: {
    createCar: (parent, { make, model, color }, { models }) => {
      const car = {
        make,
        model,
        color
      };
      return models.Car.create(car);
    },
    removeCar: (parent, { id }, { models }) => {
      return models.Car.destroy({
        where: {
          id
        }
      });
    }
  },
  Car: {
    ownedBy: (parent, args, { models }) => {
      return models.User.findByPk(parent.userId);
    }
  }
};

module.exports = resolvers;
