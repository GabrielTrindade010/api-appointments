const Users = require("../models/Users");
const Phone = require("../models/Phone");
const Address = require("../models/Address");
const Business = require("../models/Business");

class UserRepository {
    static async findByEmail(email) {
        return Users.findOne({ where: { email } });
    }
    static async findById(id) {
        return Users.findByPk(id, {
            include: [
                { model: Phone },
                { model: Address },
                { model: Business }
            ]
        });
    }
}

module.exports = UserRepository;