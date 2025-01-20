const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const emailService = {
  // Welcome email after registration
  sendWelcomeEmail: async (email, name) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Welcome to Our Gym!',
        html: `
          <h1>Welcome ${name}!</h1>
          <p>Thank you for joining our gym. We're excited to have you as a member.</p>
          <p>You can now:</p>
          <ul>
            <li>Book training sessions</li>
            <li>Track your attendance</li>
            <li>Record equipment usage</li>
          </ul>
        `
      });
    } catch (error) {
      console.error('Email error:', error);
    }
  },

  // Membership expiry reminder
  sendExpiryReminder: async (email, name, expiryDate) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Membership Expiry Reminder',
        html: `
          <h1>Hello ${name},</h1>
          <p>Your gym membership is expiring on ${new Date(expiryDate).toLocaleDateString()}.</p>
          <p>Please renew your membership to continue enjoying our services.</p>
        `
      });
    } catch (error) {
      console.error('Email error:', error);
    }
  },

  // Session booking confirmation
  sendSessionConfirmation: async (email, name, sessionDetails) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Session Booking Confirmation',
        html: `
          <h1>Session Booked Successfully!</h1>
          <p>Hello ${name},</p>
          <p>Your session has been booked:</p>
          <ul>
            <li>Session: ${sessionDetails.sessionName}</li>
            <li>Date: ${new Date(sessionDetails.schedule).toLocaleDateString()}</li>
            <li>Time: ${new Date(sessionDetails.schedule).toLocaleTimeString()}</li>
            <li>Trainer: ${sessionDetails.trainerName}</li>
          </ul>
        `
      });
    } catch (error) {
      console.error('Email error:', error);
    }
  },

  // Payment confirmation
  sendPaymentConfirmation: async (email, name, paymentDetails) => {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Payment Confirmation',
        html: `
          <h1>Payment Received</h1>
          <p>Hello ${name},</p>
          <p>We've received your payment:</p>
          <ul>
            <li>Amount: ₹${paymentDetails.amount}</li>
            <li>Plan: ${paymentDetails.planName}</li>
            <li>Date: ${new Date().toLocaleDateString()}</li>
          </ul>
        `
      });
    } catch (error) {
      console.error('Email error:', error);
    }
  }
};

module.exports = emailService; 