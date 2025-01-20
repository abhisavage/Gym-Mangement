const express = require('express');
const adminController = require('../controllers/adminController');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// Admin authentication
router.post('/login', adminController.login);

// Protected admin routes
router.get('/members', adminAuth, adminController.getAllMembers);
router.get('/trainers', adminAuth, adminController.getAllTrainers);
router.get('/dashboard-stats', adminAuth, adminController.getDashboardStats);

module.exports = router;