const bcrypt = require('bcrypt-nodejs');

const generateHash = (value) => (
  bcrypt.hashSync(value, bcrypt.genSaltSync(8), null)
);

const compareHash = (plainValue, hashValue) => (
  bcrypt.compareSync(plainValue, hashValue)
);

module.exports = {
  generateHash,
  compareHash
};