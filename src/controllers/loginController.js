const LoginService = require("../services/loginService");

class LoginController {
    static async login(req, res) {
        try {
            const tokens = await LoginService.login(req.body);
            return res.status(200).json(tokens);
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}

module.exports = LoginController;