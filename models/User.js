// Name, Email, Password, Role, AccountStatus;
const { model, Schema } = require('mongoose');

const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (prop) => `Invalid Email: ${prop.value}`
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    role: {
        type: [String],
        required: true,
        default: ['STUDENT']
    },
    accountStatus: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'REJECTED'],
        default: 'PENDING',
        required: true,
    },

})

const User = model('User', userScheme)

module.exports = User;