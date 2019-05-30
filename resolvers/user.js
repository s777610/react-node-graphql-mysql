const resolvers = {
  Query: {
    me: (parent, args, { me }) => me,
    user: (parent, { id }, { models }) => {
      return models.users.find(user => user.id === id);
    },
    users: (parent, args, { models }) => models.users
  },
  Mutation: {
    makeUser: (parent, { id, name }, { models }) => {
      const user = {
        id,
        name
      };
      models.users.push(user);
      return user;
    },
    removeUser: (parent, { id }, { models }) => {
      let found = false;
      models.users = models.users.filter(user => {
        if (user.id === id) found = true;
        else return user;
      });
      if (found) return true;
      else return false;
    }
  },

  User: {
    car: (parent, args, { models }) => {
      // parent is User
      // console.log(parent.cars);  [ 1, 2 ]
      return models.cars.filter(car => parent.cars.includes(car.id));
    }
  }
};

module.exports = resolvers;
