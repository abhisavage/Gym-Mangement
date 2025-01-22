const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const emailService = require('../utils/emailService');

const sessionController = {
  // Create new session
  createSession: async (req, res) => {
    try {
      const { sessionName, schedule, capacity, description } = req.body;
      const trainerId = req.user.id;

      const session = await prisma.session.create({
        data: {
          sessionName,
          trainerId,
          schedule: new Date(schedule),
          capacity,
          description
        }
      });

      res.status(201).json({
        message: 'Session created successfully',
        session
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all sessions
  getAllSessions: async (req, res) => {
    try {
      const sessions = await prisma.session.findMany({
        include: {
          trainer: {
            select: {
              name: true,
              speciality: true
            }
          }
        }
      });

      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Register for a session
  registerForSession: async (req, res) => {
    try {
      const { sessionId } = req.body;
      const memberId = req.user.id;

      const registration = await prisma.registration.create({
        data: {
          memberId,
          sessionId
        }
      });

      // Get session and member details
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          trainer: true
        }
      });

      const member = await prisma.member.findUnique({
        where: { id: memberId }
      });

      // Send confirmation email
      await emailService.sendSessionConfirmation(member.email, member.name, {
        sessionName: session.sessionName,
        schedule: session.schedule,
        trainerName: session.trainer.name
      });

      res.status(201).json({
        message: 'Successfully registered for session',
        registration
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Add feedback for a session
  addFeedback: async (req, res) => {
    try {
      const { sessionId, feedback } = req.body;
      const memberId = req.user.id;

      const updated = await prisma.registration.update({
        where: {
          memberId_sessionId: {
            memberId,
            sessionId
          }
        },
        data: { feedback }
      });

      res.json({
        message: 'Feedback added successfully',
        registration: updated
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  updateSession: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const trainerId = req.user.id;
      const { sessionName, description, schedule, capacity } = req.body;

      // First verify if the session belongs to this trainer
      const existingSession = await prisma.session.findUnique({
        where: { id: sessionId }
      });

      if (!existingSession) {
        return res.status(404).json({ message: 'Session not found' });
      }

      if (existingSession.trainerId !== trainerId) {
        return res.status(403).json({ message: 'Not authorized to update this session' });
      }

      const updatedSession = await prisma.session.update({
        where: { id: sessionId },
        data: {
          sessionName,
          description,
          schedule,
          capacity
        }
      });

      res.json({
        message: 'Session updated successfully',
        session: updatedSession
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  bookSession: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const memberId = req.user.id;

      // Check if session exists
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          registrations: true
        }
      });

      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      // Check if session is already booked by this member
      const existingRegistration = await prisma.registration.findFirst({
        where: {
          sessionId,
          memberId
        }
      });

      if (existingRegistration) {
        return res.status(400).json({ message: 'You have already booked this session' });
      }

      // Check if session is full
      if (session.registrations.length >= session.capacity) {
        return res.status(400).json({ message: 'Session is already full' });
      }

      // Create new registration
      const registration = await prisma.registration.create({
        data: {
          sessionId: sessionId,
          memberId: memberId
        },
        include: {
          session: {
            include: {
              trainer: {
                select: {
                  id: true,
                  name: true,
                  speciality: true
                }
              }
            }
          }
        }
      });

      res.status(201).json({
        message: 'Session booked successfully',
        registration: {
          id: registration.id,
          sessionDetails: {
            id: registration.session.id,
            sessionName: registration.session.sessionName,
            description: registration.session.description,
            schedule: registration.session.schedule,
            capacity: registration.session.capacity,
            trainer: registration.session.trainer
          }
        }
      });

    } catch (error) {
      res.status(500).json({ 
        message: 'Error booking session', 
        error: error.message 
      });
    }
  },

  getAvailableSessions: async (req, res) => {
    try {
      const sessions = await prisma.session.findMany({
        include: {
          trainer: {
            select: {
              id: true,
              name: true,
              speciality: true
            }
          },
          registrations: true // Include to check capacity
        },
      });

      // Filter and format sessions
      const availableSessions = sessions.map(session => ({
        id: session.id,
        title: session.title,
        description: session.description,
        duration: session.duration,
        availableSpots: session.capacity - session.registrations.length,
        trainer: {
          id: session.trainer.id,
          name: session.trainer.name,
          speciality: session.trainer.speciality
        }
      })).filter(session => session.availableSpots > 0);

      res.json({
        message: 'Available sessions retrieved successfully',
        sessions: availableSessions
      });

    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving available sessions', 
        error: error.message 
      });
    }
  },

  deleteSession: async (req, res) => {
    try {
      const { sessionId } = req.params;
      const trainerId = req.user.id;

      // First check if session exists and belongs to this trainer
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          registrations: true
        }
      });

      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      if (session.trainerId !== trainerId) {
        return res.status(403).json({ message: 'Not authorized to delete this session' });
      }

      // Delete all registrations for this session first
      await prisma.registration.deleteMany({
        where: { sessionId }
      });

      // Then delete the session
      await prisma.session.delete({
        where: { id: sessionId }
      });

      res.json({ 
        message: 'Session and related registrations deleted successfully',
        deletedSessionId: sessionId
      });

    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting session', 
        error: error.message 
      });
    }
  },

  // Get all sessions created by the authenticated trainer
  getSessionsByTrainer: async (req, res) => {
    const trainerId = req.user.id; // Assuming the trainer's ID is stored in the authenticated user object

    try {
      const sessions = await prisma.session.findMany({
        where: {
          trainerId: trainerId, // Filter sessions by the trainer's ID
        },
        include: {
          registrations: true, // Include registrations if needed
        },
        orderBy: {
          schedule: "asc", // Order by schedule or any other field
        },
      });

      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving sessions", error: error.message });
    }
  },

  getSessionById: async (req, res) => {
    try {
      const { sessionId } = req.params; // Extract sessionId from request parameters

      // Fetch the session details along with the trainer information
      const session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
          trainer: {
            select: {
              name: true,
              speciality: true
            }
          }
        }
      });

      // Check if the session exists
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      // Return the session details
      res.json(session);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get registered members for a specific session
  getRegisteredMembers: async (req, res) => {
    const { sessionId } = req.params; // Extract sessionId from request parameters

    try {
      const registrations = await prisma.registration.findMany({
        where: { sessionId },
        include: {
          member: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = sessionController;