const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Store verification codes temporarily (in production, use Redis or database)
const verificationCodes = new Map();

const emailVerification = {
  // Generate and send verification code
  sendVerificationCode: async (email) => {
    try {
      // Generate 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store code with expiry (5 minutes)
      verificationCodes.set(email, {
        code: verificationCode,
        expiry: Date.now() + 5 * 60 * 1000 // 5 minutes
      });

      // Send email
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Gym Registration Verification Code',
        html: `
          <h1>Your Verification Code</h1>
          <p>Please use this code to complete your registration:</p>
          <h2 style="color: #007bff; font-size: 24px;">${verificationCode}</h2>
          <p>This code will expire in 5 minutes.</p>
        `
      });

      return true;
    } catch (error) {
      console.error('Email verification error:', error);
      return false;
    }
  },

  // Verify the code
  verifyCode: (email, code) => {
    const verification = verificationCodes.get(email);
    
    if (!verification) {
      return false;
    }

    if (Date.now() > verification.expiry) {
      verificationCodes.delete(email);
      return false;
    }

    if (verification.code !== code) {
      return false;
    }

    // Clean up after successful verification
    verificationCodes.delete(email);
    return true;
  }
};

module.exports = emailVerification; 