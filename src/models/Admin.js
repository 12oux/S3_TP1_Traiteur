let dbAdmin = require('./dbAdmin.js');

const Admin = dbAdmin.sequelize.define('admin', {
 
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: dbAdmin.Sequelize.INTEGER
    },

    firstname: {
        type: dbAdmin.Sequelize.STRING,
        notEmpty: true
    },

    lastname: {
        type: dbAdmin.Sequelize.STRING,
        notEmpty: true
    },

    username: {
        type: dbAdmin.Sequelize.TEXT
    },

    about: {
        type: dbAdmin.Sequelize.TEXT
    },

    email: {
        type: dbAdmin.Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },

    password: {
        type: dbAdmin.Sequelize.STRING,
        allowNull: false
    },

    last_login: {
        type: dbAdmin.Sequelize.DATE
    },

    status: {
        type: dbAdmin.Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }


});

module.exports = Admin;