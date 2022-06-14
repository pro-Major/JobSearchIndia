const jwt = require('jsonwebtoken');
const moment = require('moment');
const models = require('../models');

//Creating JSON WEB TOKEN where it will take a user Id.
// exports.generateJwtToken = (id) => {
//     return jwt.sign({ id }, process.env.TOKEN_SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRES_TIME })
// }

const generateToken = (userId, expires, type, secret = process.env.TOKEN_SECRET_KEY) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  };

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await models.token.create({
      token,
      userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };
  

exports.generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(process.env.ACCESS_TOKEN_EXPIRES_TIME, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, 'access');
  
    const refreshTokenExpires = moment().add(process.env.REFRESH_TOKEN_EXPIRES_TIME, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, 'refresh');
    await saveToken(refreshToken, user.id, refreshTokenExpires, 'refresh');
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };
//Verifying JSON WEB TOKEN
exports.verifyJwtToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY)
} 