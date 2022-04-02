// first name, last name, phone, avatar, user id
const { model, Schema } = require('mongoose');

const profileScheme = new Schema({
    firstName: String,
    lastName: String,
    phone: String,
    avatar: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

})

const Profile = model('Profile', profileScheme)

module.exports = Profile;