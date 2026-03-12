const Sequelize = require("sequelize");
const db = require("../config/database");

const Business = db.define('business', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    document: {
        type: Sequelize.STRING(18),
        allowNull: false
    }
});

module.exports = Business;