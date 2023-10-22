const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const dayjs = require('dayjs');

class Comment extends Model { }

Comment.init({
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.VIRTUAL,
    get() {
      return dayjs(this.createdAt).format('MM/DD/YYYY')
    }
  }
}, {
  modelName: 'comment',
  sequelize: db
});

module.exports = Comment;