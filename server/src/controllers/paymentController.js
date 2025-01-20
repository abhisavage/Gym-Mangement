const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const paymentController = {
  // Process payment
  processPayment: async (req, res) => {
    try {
      const { planId, amount, paymentMode } = req.body;
      const memberId = req.user.id;

      // Verify payment amount matches plan cost
      const plan = await prisma.membership.findUnique({
        where: { id: planId }
      });

      if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
      }

      if (plan.cost !== amount) {
        return res.status(400).json({ message: 'Invalid payment amount' });
      }

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          memberId,
          planId,
          amount,
          paymentMode
        }
      });

      res.status(201).json({
        message: 'Payment processed successfully',
        payment
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get member's payment history
  getPaymentHistory: async (req, res) => {
    try {
      const memberId = req.user.id;

      const payments = await prisma.payment.findMany({
        where: { memberId },
        include: {
          membership: true
        },
        orderBy: {
          paymentDate: 'desc'
        }
      });

      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all payments (admin only)
  getAllPayments: async (req, res) => {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          member: {
            select: {
              name: true,
              email: true
            }
          },
          membership: true
        },
        orderBy: {
          paymentDate: 'desc'
        }
      });

      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get total revenue and active memberships
  getRevenueAndActiveMemberships: async (req, res) => {
    try {
      // Calculate total revenue
      const totalRevenue = await prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
      });

      // Get all memberships and count active memberships
      const memberships = await prisma.membership.findMany({
        select: {
          id: true,
          planName: true,
          members: {
            where: {
              planEndDate: {
                gte: new Date(), // Only count active memberships
              },
            },
          },
        },
      });

      // Map memberships to include active count
      const activeMemberships = memberships.map(plan => ({
        planId: plan.id,
        planName: plan.planName,
        activeCount: plan.members.length, // Count of active members
      }));

      res.json({
        totalRevenue: totalRevenue._sum.amount || 0,
        activeMemberships,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving revenue and active memberships', error: error.message });
    }
  }
};

module.exports = paymentController; 