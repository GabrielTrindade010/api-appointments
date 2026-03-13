const bcrypt = require("bcrypt");
const LoginDTO = require("../dtos/loginDTO");
const { loginSchema } = require("../utils/userValidator");
const UserRepository = require("../repository/UserRepository");
const TokenService = require("./TokenService");

class LoginServices {

    static async login(data) {
        const validateData = loginSchema.parse(data);
        const dto = new LoginDTO(validateData);
        const user = await UserRepository.findByEmail(dto.email);
        
        if(!user) throw new Error("Invalid credentials.");
        
        const passwordMatch = await bcrypt.compare(dto.password, user.password);
        
        if(!passwordMatch) throw new Error("Invalid credentials.")
            
        return TokenService.generateAuthTokens(user.id);
    }
            
}

module.exports = LoginServices;