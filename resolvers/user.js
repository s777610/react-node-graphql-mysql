const auth = require("../util/auth");
const cloudinary = require("cloudinary");
const keys = require("../config/key");
const path = require("path");

cloudinary.config({
  cloud_name: keys.cloudName,
  api_key: keys.apiKey,
  api_secret: keys.apiSecret
});

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
    },
    login: async (parent, { username, password }, { models, secret }) => {
      const user = await models.User.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }

      const validPassword = await user.validatePassword(password);

      if (!validPassword) {
        throw new Error("Invalid Password");
      }

      return {
        token: auth.createToken(user, secret)
      };
    },
    uploadImage: async (parent, { filename }, { models, me }) => {
      if (!me) {
        throw new Error("Not Authenticated!");
      }

      const mainDir = path.dirname(require.main.filename);
      filename = `${mainDir}/uploads/${filename}`;
      try {
        const photo = await cloudinary.v2.uploader.upload(filename);
        await models.User.update(
          {
            photo: `${photo.public_id}.${photo.format}`
          },
          {
            where: { username: me.username }
          }
        );
        return `${photo.public_id}.${photo.format}`;
      } catch (err) {
        throw new Error(err);
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
