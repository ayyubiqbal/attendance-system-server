const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { findUserByProperty, createNewUser } = require('./user')

const registerService = async ({ name, email, password }) => {
    let user = await findUserByProperty('email', email)
    if (user) {
        const error = new Error('User already exist');
        error.status = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash })

}

const loginService = async ({ email, password }) => {
    const user = await findUserByProperty('email', email);
    if (!user) {
        const error = new Error('Invalid Credential');
        error.status(400);
        throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        const error = new Error('Invalid Credential');
        error.status = 400;
        throw error;
    }

    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        accountStatus: user.accountStatus,

    }

    return jwt.sign(payload, 'secret-key', { expiresIn: '2h' })
}

module.exports = {
    registerService,
    loginService
}