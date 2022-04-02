const { model, Schema } = require('mongoose');

//  CreatedAt: DateTime, Status, TimeLimit

const adminAttendanceSchema = new Schema({
    timeLimit: String,
    status: String,
    createdAt: Date,
});

const AdminAttendance = model('AdminAttendance', adminAttendanceSchema);
module.exports = AdminAttendance;