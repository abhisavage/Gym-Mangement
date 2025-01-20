const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const attendanceController = {
  // Mark attendance (check-in)
  checkIn: async (req, res) => {
    try {
      const memberId = req.user.id;

      // Check if member already checked in today
      const existingAttendance = await prisma.attendance.findFirst({
        where: {
          memberId,
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          },
          outTime: null
        }
      });

      if (existingAttendance) {
        return res.status(400).json({ message: 'Already checked in' });
      }

      const attendance = await prisma.attendance.create({
        data: {
          memberId,
          inTime: new Date()
        }
      });

      res.status(201).json({
        message: 'Check-in successful',
        attendance
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Mark attendance (check-out)
  checkOut: async (req, res) => {
    try {
      const memberId = req.user.id;

      // Find active attendance record
      const activeAttendance = await prisma.attendance.findFirst({
        where: {
          memberId,
          outTime: null
        }
      });

      if (!activeAttendance) {
        return res.status(400).json({ message: 'No active check-in found' });
      }

      const attendance = await prisma.attendance.update({
        where: {
          id: activeAttendance.id
        },
        data: {
          outTime: new Date()
        }
      });

      res.json({
        message: 'Check-out successful',
        attendance
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get member's attendance history
  getMemberAttendance: async (req, res) => {
    try {
      const memberId = req.user.id;
      const { startDate, endDate } = req.query;

      const whereClause = {
        memberId
      };

      if (startDate && endDate) {
        whereClause.date = {
          gte: new Date(startDate),
          lte: new Date(endDate)
        };
      }

      const attendance = await prisma.attendance.findMany({
        where: whereClause,
        orderBy: {
          date: 'desc'
        }
      });

      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get all attendance records (admin only)
  getAllAttendance: async (req, res) => {
    try {
      const { date } = req.query;

      const whereClause = {};
      if (date) {
        whereClause.date = {
          gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
          lt: new Date(new Date(date).setHours(24, 0, 0, 0))
        };
      }

      const attendance = await prisma.attendance.findMany({
        where: whereClause,
        include: {
          member: {
            select: {
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          date: 'desc'
        }
      });

      res.json(attendance);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // Get attendance statistics (admin only)
  getAttendanceStats: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      // Get attendance stats grouped by memberId
      const stats = await prisma.attendance.groupBy({
        by: ['memberId'],
        where: {
          date: {
            gte: new Date(startDate || new Date().setDate(new Date().getDate() - 30)),
            lte: new Date(endDate || new Date())
          }
        },
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        }
      });

      // Calculate total attendance and average attendance per member
      const totalAttendance = stats.reduce((acc, stat) => acc + stat._count.id, 0);
      const averageAttendance = totalAttendance / stats.length || 0;

      // Get total members in the specified date range
      const totalMembers = await prisma.member.count({
        where: {
          attendance: {
            some: {
              date: {
                gte: new Date(startDate || new Date().setDate(new Date().getDate() - 30)),
                lte: new Date(endDate || new Date())
              }
            }
          }
        }
      });

      // Calculate attendance rate
      const attendanceRate = (totalMembers > 0) ? (totalAttendance / totalMembers) * 100 : 0;

      // Fetch member details for the stats
      const memberIds = stats.map(stat => stat.memberId);
      const members = await prisma.member.findMany({
        where: {
          id: { in: memberIds }
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      // Combine stats with member details
      const detailedStats = stats.map(stat => {
        const member = members.find(m => m.id === stat.memberId);
        return {
          memberId: stat.memberId,
          attendanceCount: stat._count.id,
          memberName: member ? member.name : null,
          memberEmail: member ? member.email : null
        };
      });

      // Attendance trends over time
      const attendanceTrends = await prisma.attendance.groupBy({
        by: ['date'],
        where: {
          date: {
            gte: new Date(startDate || new Date().setDate(new Date().getDate() - 30)),
            lte: new Date(endDate || new Date())
          }
        },
        _count: {
          id: true
        },
        orderBy: {
          date: 'asc'
        }
      });

      // Most active members
      const mostActiveMembers = detailedStats.sort((a, b) => b.attendanceCount - a.attendanceCount).slice(0, 5); // Top 5 members

      res.json({
        totalAttendance,
        averageAttendance,
        attendanceRate,
        detailedStats,
        attendanceTrends,
        mostActiveMembers
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = attendanceController; 