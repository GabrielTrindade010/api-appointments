const Sequelize = require("sequelize");
const db = require("../config/database");

const Users = db.define('users', {

    id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(255),
        allowNull: false
    }

});

module.exports = Users;