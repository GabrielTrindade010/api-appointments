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

    async profile(req, res) {
        try {
            const user = await userServices.getUser(req.params);
            return res.status(200).json(user)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

}

module.exports = new UserController();