const resolvers = {
  Query: {
    //me: (parent, args, { me }) => me,
    user: (parent, { id }, { models }) => {
      return models.User.findByPk(id);
    },
    users: (parent, args, { models }) => models.User.findAll()
  },
  Mutation: {
    makeUser: (parent, { name }, { models }) => {
      const user = {
        name
      };
      return models.User.create(user);
    },
    removeUser: (parent, { id }, { models }) => {
      return models.User.destroy({
        where: {
          id
        }
      });
    }
  },

  User: {
    car: (parent, args, { models }) => {
      return models.Car.findAll({
        where: {
          userId: parent.id
        }
      });
    }
  }
};

module.exports = resolvers;
