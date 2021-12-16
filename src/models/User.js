let dbUser = require('./dbUser.js');

const User = dbUser.sequelize.define('user', {
 
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dbUser.Sequelize.INTEGER
    },

    firstname: {
        type: dbUser.Sequelize.STRING,
        notEmpty: true
    },

    lastname: {
        type: dbUser.Sequelize.STRING,
        notEmpty: true
    },

    username: {
        type: dbUser.Sequelize.TEXT
    },

    about: {
        type: dbUser.Sequelize.TEXT
    },

    email: {
        type: dbUser.Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: dbUser.Sequelize.STRING,
        allowNull: false
    },

    last_login: {
        type: dbUser.Sequelize.DATE
    },

    status: {
        type: dbUser.Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }


});

module.exports = User;