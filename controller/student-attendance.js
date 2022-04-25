const { addMinutes, isAfter } = require('date-fns')
const StudentAttendance = require('../models/StudentAttendance')
const AdminAttendance = require('../models/AdminAttendance')
const error = require('../utils/error')

const getAttendance = async (req, res, next) => {
    const { id } = req.params;
    try {
        /**
         * step 1 - find admin by attendance id
         * step 2 - check  if it is running or not
         * step 3 - check  already register or not
         * step 4 - register entry
         */

        const adminAttendance = await AdminAttendance.findById(id);
        if (!adminAttendance) {
            throw error('Invalid Attendance ID', 400)
        }
        if (adminAttendance.status === 'COMPLETED') {
            throw error('Attendance Already Completed')
        }
        let attendance = await StudentAttendance.findOne({
            adminAttendance: id,
            user: req.user._id
        })
        if (attendance) {
            throw error('Already register', 400)
        }

        attendance = new StudentAttendance({
            user: req.user._id,
            adminAttendance: id,
        });
        await attendance.save();
        return res.status(201).json(attendance)

    } catch (e) {
        next(e)
    }
}

const getAttendanceStatus = async (_req, res, next) => {
    const running = await AdminAttendance.findOne({ status: 'RUNNING' })
    try {
        if (!running) {
            throw error('Not Running', 400)
        }

        const started = addMinutes(new Date(running.createdAt), running.timeLimit)
        if (isAfter(new Date(), started)) {
            running.status = 'COMPLETED'
            await running.save()
        }
        return res.status(200).json(running)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getAttendance,
    getAttendanceStatus
}