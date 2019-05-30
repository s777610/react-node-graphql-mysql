const Sequelize = require("sequelize");
const keys = require("../config/key");

const sequelize = new Sequelize("graphql", "root", keys.sqlPassword, {
  dialect: "mysql",
  //operatorsAliases: false,
  define: {
    timestamps: false
  }
});

module.exports = {
  sequelize
};
