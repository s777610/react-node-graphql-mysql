const resolvers = {
  Query: {
    car: (parent, { id }, { models }) => models.Car.findByPk(id),
    cars: (parent, args, { models }) => models.Car.findAll()
  },
  Mutation: {
    createCar: (parent, { make, model, color }, { models, me }) => {
      if (!me) throw new Error("Not Authenticated");

      const car = {
        make,
        model,
        color,
        userId: me.id
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
