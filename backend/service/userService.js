const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const models = require('../models')
const sequelize = models.sequelize;
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

//Check wheter the email already exists.
const getUserByEmail = async (email) => {
    return models.user.findOne({
        where: {
            email
        }
    });
};

const createUser = async (userBody) => {
    if(await getUserByEmail(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `User ${userBody.email} already exists`);
    }
    let user;
    await sequelize.transaction(async (t) => { 
    user = await models.user.create({name: userBody.name, email: userBody.email, password: userBody.password,mobileNumber: userBody.mobileNumber},{ transaction: t });
    });
    return user;
    
}


module.exports = {
    getUserByEmail,
    createUser,
}