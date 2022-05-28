const { DataTypes } = require('sequelize');
const db = require('../database/connection');


const Contact = db.define('Contact', {
  firstName: {type: DataTypes.STRING},
  lastName: {type: DataTypes.STRING},
  phone: {type: DataTypes.STRING},
 });


module.exports = Contact;