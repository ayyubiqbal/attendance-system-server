const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {
    serverSelectionTimeoutMS: 1000,
})

const Schema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
    }
})
const User = mongoose.model('User', Schema);

run()
async function run() {
    try {
        const user = await User.create({
            name: 'Ayyub Iqbal',
            age: 23,
            email: 'abuayubiqbal@gmail.com'
        })
        console.log(user);
    } catch (e) {
        console.log(e.message);
    }
}


