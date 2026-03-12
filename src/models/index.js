const db = require("../config/database");

const Users = require("./Users");
const Phone = require("./Phone");
const Business = require("./Business");
const Address = require("./Address");

const Users_Phones = require("./Users_Phones");
const Users_Business = require("./Users_Business");
const Users_Addresses = require("./Users_Addresses");

// RELACIONAMENTOS

Users.belongsToMany(Phone, {
  through: Users_Phones,
  foreignKey: "user_id"
});

Phone.belongsToMany(Users, {
  through: Users_Phones,
  foreignKey: "phone_id"
});

Users.belongsToMany(Business, {
  through: Users_Business,
  foreignKey: "user_id"
});

Business.belongsToMany(Users, {
  through: Users_Business,
  foreignKey: "business_id"
});

Users.belongsToMany(Address, {
  through: Users_Addresses,
  foreignKey: "user_id"
});

Address.belongsToMany(Users, {
  through: Users_Addresses,
  foreignKey: "address_id"
});

module.exports = {
  db,
  Users,
  Phone,
  Business,
  Address
};