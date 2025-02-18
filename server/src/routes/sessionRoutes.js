const express = require('express');
const sessionController = require('../controllers/sessionController');
const trainerAuth = require('../middlewares/trainerAuth');
const memberAuth = require('../middlewares/memberAuth');
const adminAuth = require('../middlewares/adminAuth');

const router = express.Router();

// Trainer routes
router.post('/', trainerAuth, sessionController.createSession);
router.put('/update/:sessionId', trainerAuth, sessionController.updateSession);
router.get('/:sessionId/members', trainerAuth, sessionController.getRegisteredMembers);
router.get('/my-sessions', trainerAuth, sessionController.getSessionsByTrainer);

// Member routes
router.get('/', memberAuth, sessionController.getAllSessions);
router.post('/:sessionId/book', memberAuth, sessionController.bookSession);
router.post('/:sessionId/feedback', memberAuth, sessionController.addFeedback);
router.get('/:sessionId/feedback', memberAuth, sessionController.getFeedback);

// Public routes
router.get('/available', sessionController.getAvailableSessions);
router.get('/:sessionId', sessionController.getSessionById);

// Admin Routes
router.delete('/delete/:sessionId', adminAuth, sessionController.deleteSession);
router.get('/:trainerId/sessions', adminAuth, sessionController.getSessionsOfTrainerByAdmin);


module.exports = router;