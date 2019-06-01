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
    },
    register: async (parent, { name, username, password }, { models }) => {
      const user = {
        name,
        username,
        password
      };

      const registeredUser = await models.User.create(user);
      try {
        if (typeof registeredUser.id === "number") {
          return true;
        } else return false;
      } catch (err) {
        console.error(err);
        return false;
      }
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
