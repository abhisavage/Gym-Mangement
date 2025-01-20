const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const memberAuth = require('../middlewares/memberAuth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// Member routes
router.post('/check-in', memberAuth, attendanceController.checkIn);
router.post('/check-out', memberAuth, attendanceController.checkOut);
router.get('/history', memberAuth, attendanceController.getMemberAttendance);

// Admin routes
router.get('/all', adminAuth, attendanceController.getAllAttendance);
router.get('/stats', adminAuth, attendanceController.getAttendanceStats);

module.exports = router; 