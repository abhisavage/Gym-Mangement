const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const equipmentController = {
  // Add new equipment
  addEquipment: async (req, res) => {
    try {
      const { name, category, quantity, status } = req.body;

      const equipment = await prisma.equipment.create({
        data: {
          name,
          category,
          quantity,
          status
        }
      });

      res.status(201).json({
        message: 'Equipment added successfully',
        equipment
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all equipment
  getAllEquipment: async (req, res) => {
    try {
      const equipment = await prisma.equipment.findMany({
        include: {
          usages: true
        }
      });

      res.json(equipment);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Update equipment status
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status, quantity } = req.body;

      const equipment = await prisma.equipment.update({
        where: { id },
        data: { 
          status,
          quantity: quantity || undefined
        }
      });

      res.json({
        message: 'Equipment updated successfully',
        equipment
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Record equipment usage
  recordUsage: async (req, res) => {
    try {
      const { equipmentId, duration, date, time } = req.body; // Include date and time from the request
      const memberId = req.user.id;

      // Validate input
      if (!equipmentId || !date || !time) {
        return res.status(400).json({ message: 'Equipment ID, date, and time are required' });
      }

      const usage = await prisma.usage.create({
        data: {
          memberId,
          equipmentId,
          date: new Date(date), // Store date separately
          time: time, // Store time as a string or appropriate format
          duration
        }
      });

      res.status(201).json({
        message: 'Usage recorded successfully',
        usage
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get member's equipment usage history
  getMemberUsageHistory: async (req, res) => {
    try {
      const memberId = req.user.id;

      const usageHistory = await prisma.usage.findMany({
        where: { memberId },
        include: {
          equipment: {
            select: {
              name: true,
              category: true
            }
          }
        },
        orderBy: {
          date: 'desc'
        }
      });

      res.json(usageHistory);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get equipment usage statistics
  getEquipmentStats: async (req, res) => {
    try {
      const { id } = req.params;

      const usageStats = await prisma.usage.groupBy({
        by: ['equipmentId'],
        where: {
          equipmentId: id
        },
        _count: {
          id: true
        },
        _sum: {
          duration: true
        }
      });

      res.json(usageStats);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Add these new functions from adminController
  getEquipmentStatsOverview: async (req, res) => {
    console.log('Stats overview endpoint called!');
    
    try {
      // Step 1: Get all equipment with their usages
      const stats = await prisma.equipment.findMany({
        select: {
          id: true,
          name: true,
          category: true,
          status: true,
          quantity: true,
          usages: {
            select: {
              id: true,
              time: true,
              duration: true,
              member: {
                select: {
                  name: true,
                  email: true
                }
              }
            },
            orderBy: {
              time: 'desc'
            },
            take: 5  // Get only the 5 most recent usages
          },
          _count: {
            select: {
              usages: true  // Get total count of usages
            }
          }
        }
      });

      // console.log('Raw equipment data:', stats);

      // Step 2: Transform the data with calculated statistics
      const enrichedStats = stats.map(equipment => {
        // Calculate total duration of all usages
        const totalDuration = equipment.usages.reduce((sum, usage) => sum + usage.duration, 0);
        
        return {
          id: equipment.id,
          name: equipment.name,
          category: equipment.category,
          status: equipment.status,
          quantity: equipment.quantity,
          totalUsages: equipment._count.usages,
          recentUsages: equipment.usages,
          utilizationRate: equipment.quantity ? (equipment._count.usages / equipment.quantity) : 0,
          averageDuration: equipment.usages.length > 0 ? totalDuration / equipment.usages.length : 0
        };
      });

      // console.log('Enriched stats:', enrichedStats);
      res.json(enrichedStats);

    } catch (error) {
      console.error('Error in getEquipmentStatsOverview:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  getEquipmentUsageByDateRange: async (req, res) => {
    console.log('Usage by date range endpoint called!');
    console.log('Query params:', req.query);
    
    try {
      const { startDate, endDate } = req.query;
      
      // Set default date range if not provided (last 30 days)
      const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 30));
      const defaultEndDate = new Date();

      // Parse dates or use defaults
      const start = startDate ? new Date(startDate) : defaultStartDate;
      const end = endDate ? new Date(endDate) : defaultEndDate;

      console.log('Querying for date range:', { start, end });

      const usageStats = await prisma.usage.findMany({
        where: {
          time: {
            gte: start,
            lte: end
          }
        },
        include: {
          equipment: {
            select: {
              name: true,
              category: true
            }
          },
          member: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          time: 'desc'
        }
      });

      console.log('Found usage records:', usageStats.length);

      // Group by equipment
      const groupedStats = usageStats.reduce((acc, usage) => {
        const equipmentId = usage.equipmentId;
        if (!acc[equipmentId]) {
          acc[equipmentId] = {
            equipmentName: usage.equipment.name,
            category: usage.equipment.category,
            totalUsages: 0,
            totalDuration: 0,
            usages: []
          };
        }
        
        acc[equipmentId].totalUsages += 1;
        acc[equipmentId].totalDuration += usage.duration;
        acc[equipmentId].usages.push({
          time: usage.time,
          duration: usage.duration,
          member: usage.member
        });
        
        return acc;
      }, {});

      const result = Object.entries(groupedStats).map(([equipmentId, stats]) => ({
        equipmentId,
        ...stats,
        averageDuration: stats.totalDuration / stats.totalUsages
      }));

      console.log('Processed stats:', result);
      res.json(result);
      
    } catch (error) {
      console.error('Error in getEquipmentUsageByDateRange:', error);
      res.status(500).json({ 
        message: 'Server error', 
        error: error.message,
        details: 'Error fetching equipment usage by date range'
      });
    }
  },

  // Debug endpoint to view all usage records
  getAllUsageRecords: async (req, res) => {
    try {
      const allUsages = await prisma.usage.findMany({
        include: {
          member: {
            select: {
              name: true,
              email: true
            }
          },
          equipment: {
            select: {
              name: true,
              category: true
            }
          }
        }
      });

      console.log('All usage records:', allUsages);
      res.json(allUsages);
    } catch (error) {
      console.error('Error fetching all usage records:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = equipmentController; 