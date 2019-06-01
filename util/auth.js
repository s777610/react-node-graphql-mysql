const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { id, name, username } = user;
  return jwt.sign({ id, name, username }, secret, { expiresIn });
};

module.exports = {
  createToken
};
