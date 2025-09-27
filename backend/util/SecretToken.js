// backend/util/SecretToken.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.createSecretToken = (id) => {
  // NOTE: TOKEN_KEY should be long & secret
  return jwt.sign({ id }, process.env.TOKEN_KEY || process.env.JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60 // 3 days
  });
};
