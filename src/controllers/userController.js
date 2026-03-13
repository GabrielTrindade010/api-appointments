const userServices = require("../services/userServices");

class UserController {

    async create(req, res) {

        try {
            
            const user = await userServices.createUser(req.body);
            return res.status(201).json(user);

        } catch (error) {
            
            return res.status(400).json({
                error: error.message
            });

        }

    }

}

module.exports = new UserController();