const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const memberRoutes = require('./routes/memberRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/attendance', attendanceRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 