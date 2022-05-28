const { DataTypes } = require('sequelize');
const db = require('../database/connection');


const User = db.define('User', {
  name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  password: {type: DataTypes.STRING},
  status: {type: DataTypes.NUMBER},
});


module.exports = User;