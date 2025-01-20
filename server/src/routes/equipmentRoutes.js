const express = require('express');
const equipmentController = require('../controllers/equipmentController');
const memberAuth = require('../middlewares/memberAuth');
const trainerAuth = require('../middlewares/trainerAuth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// // Test route
// router.get('/test', (req, res) => {
//   console.log('Test route hit!');
//   res.json({ message: 'Test route working' });
// });

// Admin only routes
router.post('/', adminAuth, equipmentController.addEquipment);
router.put('/:id', adminAuth, equipmentController.updateStatus);
router.get('/stats/overview', adminAuth, equipmentController.getEquipmentStatsOverview);
router.get('/stats/usage-by-date', adminAuth, equipmentController.getEquipmentUsageByDateRange);
router.get('/stats/:id', adminAuth, equipmentController.getEquipmentStats);
router.get('/getAll', adminAuth, equipmentController.getAllEquipment);
// router.get('/debug/all-usages', adminAuth, equipmentController.getAllUsageRecords);

// Member routes (only for recording their own usage)
router.post('/usage', memberAuth, equipmentController.recordUsage);
router.get('/usage/history', memberAuth, equipmentController.getMemberUsageHistory);

module.exports = router;