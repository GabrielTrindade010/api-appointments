const Sequelize = require("sequelize");
const db = require("../config/database");

const Address = db.define('address', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    street: {
        type: Sequelize.STRING(125),
        allowNull: false
    },
    house_number: {
        type: Sequelize.STRING(10),
        allowNull: false 
    },
    complement: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    neighborhood: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    zip_code: {
        type: Sequelize.STRING(9),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    state: {
        type: Sequelize.STRING(20),
        allowNull: false
    }

});

module.exports = Address;