const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const membershipController = {
  // Admin Functions
  createPlan: async (req, res) => {
    try {
      const { planName, duration, cost, features } = req.body;

      if (!planName || !duration || !cost) {
        return res.status(400).json({ 
          message: 'Plan name, duration, and cost are required' 
        });
      }

      const plan = await prisma.membership.create({
        data: {
          planName,
          duration,
          cost,
          features: features || []
        }
      });

      res.status(201).json({
        message: 'Membership plan created successfully',
        plan
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error creating membership plan', 
        error: error.message 
      });
    }
  },

  updatePlan: async (req, res) => {
    try {
      const { planId } = req.params;
      const { planName, duration, cost, features } = req.body;

      // Check if the plan exists before attempting to update
      const existingPlan = await prisma.membership.findUnique({
        where: { id: planId }
      });

      if (!existingPlan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }

      const updatedPlan = await prisma.membership.update({
        where: { id: planId },
        data: {
          planName,
          duration,
          cost,
          features
        }
      });

      res.json({
        message: 'Membership plan updated successfully',
        plan: updatedPlan
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error updating membership plan', 
        error: error.message 
      });
    }
  },

  deletePlan: async (req, res) => {
    try {
      const { planId } = req.params;

      await prisma.membership.delete({
        where: { id: planId }
      });

      res.json({
        message: 'Membership plan deleted successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error deleting membership plan', 
        error: error.message 
      });
    }
  },

  // Admin Function
  getAllPlansAdmin: async (req, res) => {
    try {
      const plans = await prisma.membership.findMany({
        select: {
          id: true,
          planName: true,
          duration: true,
          cost: true,
          features: true,
          _count: {
            select: {
              members: true
            }
          }
        }
      });

      res.json({
        message: 'All membership plans retrieved successfully',
        plans: plans.map(plan => ({
          id: plan.id,
          planName: plan.planName,
          duration: plan.duration,
          cost: plan.cost,
          features: plan.features,
          memberCount: plan._count.members
        }))
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving membership plans', 
        error: error.message 
      });
    }
  },

  // Public Function
  getAllPlans: async (req, res) => {
    try {
      const plans = await prisma.membership.findMany({
        where: {
          // Optionally filter to only include active plans
          // isActive: true // Uncomment if you have an isActive field
        },
        select: {
          id: true,
          planName: true,
          duration: true,
          cost: true,
          features: true
        }
      });

      res.json({
        message: 'Membership plans retrieved successfully',
        plans: plans.map(plan => ({
          id: plan.id,
          planName: plan.planName,
          duration: plan.duration,
          cost: plan.cost,
          features: plan.features
        }))
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving membership plans', 
        error: error.message 
      });
    }
  },

  // Member Functions
  purchasePlan: async (req, res) => {
    try {
      const { planId } = req.params;
      const { paymentMode } = req.body;
      const memberId = req.user.id;

      // Get the plan details
      const plan = await prisma.membership.findUnique({
        where: { id: planId }
      });

      if (!plan) {
        return res.status(404).json({ message: 'Membership plan not found' });
      }

      // Calculate plan dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + plan.duration);

      // Create payment record
      const payment = await prisma.payment.create({
        data: {
          memberId,
          amount: plan.cost,
          paymentMode,
          planId,
        }
      });

      // Update member's membership
      const updatedMember = await prisma.member.update({
        where: { id: memberId },
        data: {
          membershipId: planId,
          planStartDate: startDate,
          planEndDate: endDate
        },
        include: {
          membership: true
        }
      });

      res.status(201).json({
        message: 'Membership purchased successfully',
        membership: {
          plan: updatedMember.membership.planName,
          startDate: updatedMember.planStartDate,
          endDate: updatedMember.planEndDate,
          cost: payment.amount,
          paymentId: payment.id
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error purchasing membership', 
        error: error.message 
      });
    }
  },

  getMembershipStatus: async (req, res) => {
    try {
      const memberId = req.user.id;

      const member = await prisma.member.findUnique({
        where: { id: memberId },
        include: {
          membership: true
        }
      });

      if (!member.membershipId || !member.planEndDate || member.planEndDate < new Date()) {
        return res.json({
          message: 'No active membership found',
          hasActiveMembership: false
        });
      }

      res.json({
        message: 'Membership status retrieved successfully',
        hasActiveMembership: true,
        membership: {
          plan: member.membership.planName,
          startDate: member.planStartDate,
          endDate: member.planEndDate,
          daysRemaining: Math.ceil((member.planEndDate - new Date()) / (1000 * 60 * 60 * 24))
        }
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving membership status', 
        error: error.message 
      });
    }
  },

  getPurchaseHistory: async (req, res) => {
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

      res.json({
        message: 'Purchase history retrieved successfully',
        purchases: payments.map(payment => ({
          id: payment.id,
          plan: payment.membership.planName,
          amount: payment.amount,
          paymentDate: payment.paymentDate,
          paymentMode: payment.paymentMode
        }))
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Error retrieving purchase history', 
        error: error.message 
      });
    }
  }
};

module.exports = membershipController; 