const httpStatus = require('http-status');
const {createUser} = require('../service/userService');
const {login} = require('../service/authService');
const {generateAuthTokens} = require('../utils/jwt');


exports.register = async (req, res) => {
    const user = await createUser(req.body);
    const tokens = await generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({message : "User created successfully" ,tokens,user});
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await login(email, password);
    const tokens = await generateAuthTokens(user);
    res.send({ message : "Login Successfull",tokens, user });
  };
  