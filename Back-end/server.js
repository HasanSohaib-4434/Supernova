const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
    
// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER, // Your email: sohaibhasanpk@gmail.com
    pass: process.env.EMAIL_PASS // App Password from Gmail
  }
});

// Verify transporter configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log('Transporter verification failed:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// POST route to handle form submission
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate request data
  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please provide all required fields' });
  }

  // Email to client
  const clientMailOptions = {
    from: `"Novatec Sol" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Thank You for Reaching Out to Novatec Sol!',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for contacting Novatec Sol! We have received your message and are excited to connect with you.</p>
      <p><strong>Your Message:</strong> ${message}</p>
      <p>Our team will get back to you soon to discuss how we can help transform your digital presence.</p>
      <p>Best regards,<br/>The Novatec Sol Team</p>
      <p><small>Transforming Digital Futures</small></p>
    `
  };

  // Email to your professional email
  const adminMailOptions = {
    from: `"Novatec Sol" <${process.env.EMAIL_USER}>`,
    to: 'hassankalyar744@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>Please follow up with the client as needed.</p>
    `
  };

  try {
    // Send both emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(adminMailOptions);
    res.json({ msg: 'success' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ msg: 'fail', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});