const Sequelize = require("sequelize");
const db = require("../config/database");

const Phone = db.define('phone', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    area_code: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    code_mobile: {
        type: Sequelize.STRING(20),
        allowNull: true
    }

});

module.exports = Phone;