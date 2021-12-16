const { Sequelize, Model, DataTypes } = require("sequelize");
let dbAdmin = {};


const sequelize = new Sequelize('Passport', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

dbAdmin.sequelize = sequelize;
dbAdmin.Sequelize = Sequelize;

module.exports = dbAdmin;