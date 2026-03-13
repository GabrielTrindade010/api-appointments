const Users = require("../models/Users");

class UserRepository {
    static async findByEmail(email) {
        return Users.findOne({ where: { email } });
    }
}

module.exports = UserRepository;