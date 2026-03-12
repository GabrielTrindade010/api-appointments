const Sequelize = require("sequelize");
const db = require("../config/database");

const Users_Business = db.define('users_business', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    business_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = Users_Business;