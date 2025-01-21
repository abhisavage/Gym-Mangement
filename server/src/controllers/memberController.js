const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const emailService = require('../utils/emailService');

const prisma = new PrismaClient();

const memberController = {
  // Register a new member
  register: async (req, res) => {
    try {
      // console.log('Registration data:', req.body);
      const { name, email, password, age } = req.body;

      // Check if member already exists
      const existingMember = await prisma.member.findUnique({
        where: { email }
      });

      if (existingMember) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new member
      const member = await prisma.member.create({
        data: {
          name,
          email,
          password: hashedPassword,
          age
        }
      });

      // Create token
      const token = jwt.sign(
        { id: member.id, email: member.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      // Send welcome email
      // await emailService.sendWelcomeEmail(member.email, member.name);

      res.status(200).json({
        message: 'Registration successful',
        token,
        member: {
          id: member.id,
          name: member.name,
          email: member.email
        }
      });
    } catch (error) {
      // console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Login member
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find member
      const member = await prisma.member.findUnique({
        where: { email }
      });

      if (!member) {
        return res.status(400).json({ message: 'Member not found' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, member.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      // Create token
      const token = jwt.sign(
        { 
          id: member.id, 
          email: member.email,
          role: 'member'
        }, 
        process.env.JWT_SECRET
      );

      res.json({
        message: 'Login successful',
        token,
        member: {
          id: member.id,
          name: member.name,
          email: member.email,
          age: member.age
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get member profile
  getProfile: async (req, res) => {
    try {
      const member = await prisma.member.findUnique({
        where: { id: req.user.id },
        include: {
          membership: true
        }
      });

      if (!member) {
        return res.status(404).json({ message: 'Member not found' });
      }
      // Exclude the password from the response
      const { password, ...memberData } = member;
      // console.log(memberData);
      res.json(memberData);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Purchase plan
  purchasePlan: async (req, res) => {
    try {
      const { planId } = req.body;
      const memberId = req.user.id;

      // Get the plan details
      const plan = await prisma.membership.findUnique({
        where: { id: planId }
      });

      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }

      // Calculate plan dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + plan.duration);

      // Update member with new plan
      const updatedMember = await prisma.member.update({
        where: { id: memberId },
        data: {
          membershipId: planId,
          planStartDate: startDate,
          planEndDate: endDate
        }
      });

      res.json({
        message: 'Plan purchased successfully',
        member: updatedMember
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getBookings: async (req, res) => {
    try {
      const memberId = req.user.id;

      const bookings = await prisma.registration.findMany({
        where: { 
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
        },
      });

      res.json({
        message: 'Bookings retrieved successfully',
        bookings: bookings.map(booking => ({
          id: booking.id,
          sessionDetails: {
            id: booking.session.id,
            title: booking.session.title,
            description: booking.session.description,
            duration: booking.session.duration,
            trainer: booking.session.trainer
          },
          status: booking.status,
          bookingDate: booking.createdAt
        }))
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving bookings', 
        error: error.message 
      });
    }
  }
};

module.exports = memberController; 