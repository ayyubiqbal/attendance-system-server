const { model, Schema } = require('mongoose');

//  CreatedAt: DateTime, Status, TimeLimit

const studentAttendanceSchema = new Schema({
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
    },
});

const StudentAttendance = model('StudentAttendance', studentAttendanceSchema);
module.exports = StudentAttendance;