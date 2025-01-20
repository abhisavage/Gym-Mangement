const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const trainerAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No auth token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verify if it's a trainer token
    if (decoded.role !== 'trainer') {
      return res.status(403).json({ message: 'Not authorized as trainer' });
    }

    // Verify trainer exists in database
    const trainer = await prisma.trainer.findUnique({
      where: { id: decoded.id }
    });

    if (!trainer) {
      return res.status(401).json({ message: 'Trainer not found' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate as trainer' });
  }
};

module.exports = trainerAuth; 