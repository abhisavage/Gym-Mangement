const express = require('express');
const memberController = require('../controllers/memberController');
const memberAuth = require('../middlewares/memberAuth');

const router = express.Router();

router.post('/register', memberController.register);
router.post('/login', memberController.login);
router.get('/profile', memberAuth, memberController.getProfile);
router.get('/bookings', memberAuth, memberController.getBookings);

module.exports = router;