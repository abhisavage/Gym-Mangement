const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const trainerController = {
  // Register trainer
  register: async (req, res) => {
    try {
      const { name, email, password, age, speciality } = req.body;

      // Check if trainer exists
      const existingTrainer = await prisma.trainer.findUnique({
        where: { email }
      });

      if (existingTrainer) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create trainer
      const trainer = await prisma.trainer.create({
        data: {
          name,
          email,
          password: hashedPassword,
          age,
          speciality
        }
      });

      const token = jwt.sign(
        { id: trainer.id, email: trainer.email, role: 'trainer' },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'Trainer registered successfully',
        token,
        trainer: {
          id: trainer.id,
          name: trainer.name,
          email: trainer.email,
          speciality: trainer.speciality
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Login trainer
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const trainer = await prisma.trainer.findUnique({
        where: { email }
      });

      if (!trainer) {
        return res.status(400).json({ message: 'Trainer not found' });
      }

      const isValidPassword = await bcrypt.compare(password, trainer.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const token = jwt.sign(
        { 
          id: trainer.id, 
          email: trainer.email,
          role: 'trainer'
        }, 
        process.env.JWT_SECRET
      );

      res.json({
        message: 'Login successful',
        token,
        trainer: {
          id: trainer.id,
          name: trainer.name,
          email: trainer.email,
          speciality: trainer.speciality
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update availability
  updateAvailability: async (req, res) => {
    try {
      const { availability } = req.body;
      const trainerId = req.user.id;

      const updatedTrainer = await prisma.trainer.update({
        where: { id: trainerId },
        data: { availability }
      });

      res.json({
        message: 'Availability updated successfully',
        trainer: updatedTrainer
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get trainer's sessions
  getSessions: async (req, res) => {
    try {
      const trainerId = req.user.id;

      const sessions = await prisma.session.findMany({
        where: { trainerId },
        include: {
          registrations: {
            include: {
              member: {
                select: {
                  id: true,
                  name: true,
                  email: true
                }
              }
            }
          }
        }
      });

      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update trainer profile
  updateProfile: async (req, res) => {
    try {
      const { name, age, speciality } = req.body;
      const trainerId = req.user.id;

      const updatedTrainer = await prisma.trainer.update({
        where: { id: trainerId },
        data: {
          name,
          age,
          speciality
        }
      });

      res.json({
        message: 'Profile updated successfully',
        trainer: {
          id: updatedTrainer.id,
          name: updatedTrainer.name,
          email: updatedTrainer.email,
          age: updatedTrainer.age,
          speciality: updatedTrainer.speciality
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get trainer profile
  getProfile: async (req, res) => {
    try {
      const trainerId = req.user.id;

      const trainer = await prisma.trainer.findUnique({
        where: { id: trainerId }
      });

      if (!trainer) {
        return res.status(404).json({ message: 'Trainer not found' });
      }

      res.json({
        trainer: {
          id: trainer.id,
          name: trainer.name,
          email: trainer.email,
          age: trainer.age,
          speciality: trainer.speciality
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get public trainer profile
  getPublicProfile: async (req, res) => {
    try {
      const { trainerId } = req.params;

      const trainer = await prisma.trainer.findUnique({
        where: { id: trainerId },
        select: {
          id: true,
          name: true,
          speciality: true,
          // Include any other public fields you want to show
          // Excluding sensitive info like email, password
        }
      });

      if (!trainer) {
        return res.status(404).json({ message: 'Trainer not found' });
      }

      res.json({ trainer });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = trainerController; 