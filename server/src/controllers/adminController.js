const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const adminController = {
  // Admin login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // In a real application, you would have an admin table
      // For now, we'll use hardcoded admin credentials
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;

      if (email !== adminEmail) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      if (password !== adminPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { 
          id: 'admin',
          email: adminEmail,
          role: 'admin'
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Admin login successful',
        token
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all members
  getAllMembers: async (req, res) => {
    try {
      const members = await prisma.member.findMany({
        include: {
          membership: true,
          payments: true,
          attendance: {
            take: 5,
            orderBy: {
              date: 'desc'
            }
          }
        }
      });

      res.json(members);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all trainers
  getAllTrainers: async (req, res) => {
    try {
      const trainers = await prisma.trainer.findMany({
        include: {
          sessions: true
        }
      });

      // Exclude password from the response
      const trainersWithoutPassword = trainers.map(({ password, ...trainer }) => trainer);

      res.json(trainersWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get dashboard statistics
  getDashboardStats: async (req, res) => {
    try {
      const totalMembers = await prisma.member.count();
      const totalTrainers = await prisma.trainer.count();
      const totalSessions = await prisma.session.count();
      
      const todayAttendance = await prisma.attendance.count({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      });

      res.json({
        totalMembers,
        totalTrainers,
        totalSessions,
        todayAttendance
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = adminController; 