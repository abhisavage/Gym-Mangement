const express = require('express');
const membershipController = require('../controllers/membershipController');
const adminAuth = require('../middlewares/adminAuth');
const memberAuth = require('../middlewares/memberAuth');

const router = express.Router();

// Admin routes for managing plans
router.post('/plans', adminAuth, membershipController.createPlan);
router.put('/plans/:planId', adminAuth, membershipController.updatePlan);
router.delete('/plans/:planId', adminAuth, membershipController.deletePlan);
router.get('/plans/all', adminAuth, membershipController.getAllPlansAdmin);

// Public routes to view available plans
router.get('/plans', membershipController.getAllPlans);


// Member routes for purchasing
router.post('/purchase/:planId', memberAuth, membershipController.purchasePlan);
router.get('/my-membership', memberAuth, membershipController.getMembershipStatus);
router.get('/purchase-history', memberAuth, membershipController.getPurchaseHistory);

module.exports = router; 