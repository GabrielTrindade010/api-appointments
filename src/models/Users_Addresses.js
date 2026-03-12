const Sequelize = require("sequelize");
const db = require("../config/database");

const Users_Addresses = db.define('users_addresses', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Users_Addresses;