const Sequelize = require("sequelize");
const db = require("../config/database");

const Users_Phones = db.define('users_phones', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    phone_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Users_Phones;