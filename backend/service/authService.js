const httpStatus = require('http-status');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
const models = require('../models')
const {getUserByEmail} = require('../service/userService')


const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if(!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED,'Incorrect email or password');
    }
    return user;
}

module.exports = {
    login
}