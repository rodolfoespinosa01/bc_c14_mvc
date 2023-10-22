// Import Model and DataTypes from sequelize
const { Model, DataTypes } = require('sequelize');

const db = require('../config/connection');

const { hash, compare } = require('bcrypt');

// Create a User class and extend the Model class
class User extends Model { }

// Call User.init and setup a couple columns/fields - email & password as text strings
User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address is already in use.'
    },
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: 6,
        msg: 'Your password must be at least 6 characters long.'
      }
    }
  }
}, {
  modelName: 'user',
  // Connection object
  sequelize: db,
  hooks: {
    async beforeCreate(user) {
      user.password = await hash(user.password, 10);

      return user;
    }
  }
});

User.prototype.validatePass = async function (formPassword) {
  const isValid = await compare(formPassword, this.password);

  return isValid;
}

// Export the User model
module.exports = User;