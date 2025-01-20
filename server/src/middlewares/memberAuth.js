const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const memberAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No auth token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify if it's a member token
    if (decoded.role !== 'member') {
      return res.status(403).json({ message: 'Not authorized as member' });
    }

    // Verify member exists in database
    const member = await prisma.member.findUnique({
      where: { id: decoded.id }
    });

    if (!member) {
      return res.status(401).json({ message: 'Member not found' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate as member' });
  }
};

module.exports = memberAuth; 