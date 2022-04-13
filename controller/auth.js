const { loginService, registerService } = require('../service/auth')

/**
     * Request Input Sources:
     * req Body
     * req Param
     * req Query
     * req Header
     * req Cookies
*/
const registerController = async (req, res, next) => {
    const { name, email, password } = req.body;

    // validation check
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'invalid data' })
    };

    try {
        const user = await registerService({ name, email, password })
        return res.status(201).json({ message: 'User Created Successfully', user })
    } catch (e) {
        next(e);
    }
}

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const token = await loginService({ email, password })
        return res.status(200).json({ message: 'Login Successfully', token })

    } catch (e) {
        next(e)
    }
}

module.exports = {
    registerController,
    loginController
}