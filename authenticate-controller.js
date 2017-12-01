const {JWT_EXPIRY, JWT_SECRET} = require("./config");

const jwt = require("jsonwebtoken");

module.exports.authenticate = function(req, res) {
  const user = {
    username: "test",
    email: "test@test.com"
  };
  let token = jwt.sign(user, JWT_SECRET, {
    expiresIn: JWT_EXPIRY
  });
  res.json({
    success: true,
    token: token
  });
};