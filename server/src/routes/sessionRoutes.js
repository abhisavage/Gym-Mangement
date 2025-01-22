const express = require('express');
const sessionController = require('../controllers/sessionController');
const trainerAuth = require('../middlewares/trainerAuth');
const memberAuth = require('../middlewares/memberAuth');

const router = express.Router();

// Trainer routes
router.post('/', trainerAuth, sessionController.createSession);
router.put('/update/:sessionId', trainerAuth, sessionController.updateSession);
router.delete('/delete/:sessionId', trainerAuth, sessionController.deleteSession);
router.get('/my-sessions', trainerAuth, sessionController.getSessionsByTrainer);
router.get('/:sessionId/members', trainerAuth, sessionController.getRegisteredMembers);

// Member routes
router.get('/', memberAuth, sessionController.getAllSessions);
router.post('/:sessionId/book', memberAuth, sessionController.bookSession);

// Public routes
router.get('/available', sessionController.getAvailableSessions);
router.get('/:sessionId', sessionController.getSessionById);


module.exports = router;