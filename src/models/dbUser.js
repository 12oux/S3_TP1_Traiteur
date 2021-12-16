const { Sequelize, Model, DataTypes } = require("sequelize");
let dbUser = {};


const sequelize = new Sequelize('Passport', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

dbUser.sequelize = sequelize;
dbUser.Sequelize = Sequelize;

module.exports = dbUser;