const express = require('express');
const paymentController = require('../controllers/paymentController');
const memberAuth = require('../middlewares/memberAuth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// Member routes
// router.post('/process', memberAuth, paymentController.processPayment);
router.get('/history', memberAuth, paymentController.getPaymentHistory);

// Admin routes
router.get('/all', adminAuth, paymentController.getAllPayments);

// Get total revenue and active memberships
router.get('/revenue-and-active-memberships', adminAuth, paymentController.getRevenueAndActiveMemberships);

module.exports = router; 