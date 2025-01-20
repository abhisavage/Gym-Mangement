const express = require('express');
const trainerController = require('../controllers/trainerController');
const trainerAuth = require('../middlewares/trainerAuth');

const router = express.Router();

router.post('/register', trainerController.register);
router.post('/login', trainerController.login);
router.put('/availability', trainerAuth, trainerController.updateAvailability);
router.get('/sessions', trainerAuth, trainerController.getSessions);
router.put('/edit-profile', trainerAuth, trainerController.updateProfile);
router.get('/profile', trainerAuth, trainerController.getProfile);
router.get('/profile/:trainerId', trainerController.getPublicProfile);

module.exports = router; 