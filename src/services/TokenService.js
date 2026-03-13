const {
  generateAccessToken,
  generateRefreshToken
} = require("../utils/jwt");

class TokenService {
  static generateAuthTokens(userId) {
    const payload = { id: userId };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload)
    };
  }
}

module.exports = TokenService;