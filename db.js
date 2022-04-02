const mongoose = require('mongoose');

const connectDB = function (connectStr) {
    return mongoose.connect(connectStr)
}

module.exports = connectDB;