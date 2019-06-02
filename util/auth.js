const jwt = require("jsonwebtoken");
const keys = require("../config/key");

const createToken = (user, secret) => {
  const { id, name, username } = user;
  return jwt.sign({ id, name, username }, secret, { expiresIn: "1h" });
};

const getLoggedInUser = req => {
  const token = req.headers["x-auth-token"];
  if (token) {
    console.log(token);
    try {
      // return user obj
      return jwt.verify(token, keys.jwtSecret);
    } catch (err) {
      throw new Error("Session expired");
    }
  }
};

module.exports = {
  createToken,
  getLoggedInUser
};
