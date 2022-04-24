const User = require('../models/User');
const userService = require('../service/user')
const authService = require('../service/auth')
const error = require('../utils/error')

const getUsers = async (req, res, next) => {
    /**
     * TODO: filter, sort, pagination, select
     */
    try {
        const users = await userService.findUser()
        return res.status(200).json(users)
    }
    catch (e) {
        next(e)
    }
};

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const user = await userService.findUserByProperty('_id', userId);

        if (!user) {
            throw error("User Not Found", 404)
        }
        return res.status(200).json(user)
    }
    catch (e) {
        next(e)
    }
}

const postUser = async (req, res, next) => {
    const { name, email, password, roles, accountStatus } = req.body

    try {
        const user = await authService.registerService({ name, email, password, roles, accountStatus })
        return res.status(201).json(user)
    } catch (e) {
        next(e)
    }
};

const putUserById = async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, roles, accountStatus } = req.body;

    try {
        const user = await userService.updateUser(userId, { name, email, roles, accountStatus });

        if (!user) {
            throw error("User Not Found", 404);
        }
        return res.status(200).json(user)
    } catch (e) {
        next(e)
    }
};

const patchUserById = async (req, res, next) => {
    const { userId } = req.params;
    const { name, roles, accountStatus } = req.body;

    try {
        const user = await userService.findUserByProperty("_id", userId);

        if (!user) {
            throw error("User Not Found", 404);
        }

        user.name = name ?? user.name;
        user.roles = roles ?? user.roles;
        user.accountStatus = accountStatus ?? user.accountStatus;

        await user.save()
        return res.status(200).json(user);

    } catch (e) {
        next(e)
    }
};

const deleteUserById = async (req, res, next) => {
    /**
     * pseudo code
     * userId = input()
     * user = find user by userId
     * if user not found:
     *  return 404 error
     * else
     *  delete user from database
     *  delete all associated data
     *  return 203 status
     */
    const { userId } = req.params;
    try {
        const user = await userService.findUserByProperty('_id', userId);
        if (!user) {
            throw error('User Not Found', 404);
        }
        user.remove();
        return res.status(203).send()

    } catch (e) {
        next(e)
    }
};

module.exports = {
    getUsers,
    getUserById,
    postUser,
    putUserById,
    patchUserById,
    deleteUserById
}