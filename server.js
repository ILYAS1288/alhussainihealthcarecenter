require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Initialize express app
const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify transporter
transporter.verify((error, success) => {
    if (error) {
        console.error("Email transporter error:", error);
    } else {
        console.log("Email transporter is ready");
    }
});

// API Routes for form submissions
app.post('/api/appointments', (req, res) => {
  console.log('Appointment request received:', req.body);
  res.json({ success: true, message: 'Appointment request received' });
});

app.post('/api/contact', (req, res) => {
  console.log('Contact form submission received:', req.body);
  res.json({ success: true, message: 'Message received' });
});

// Handle form submission
app.post('/book-appointment', async (req, res) => {
    const { name, email, phone, date, time, department, doctor, message, newPatient } = req.body;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'elibubalteen@gmail.com',
        subject: 'New Appointment Booking',
        text: `
        New appointment booking:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Date: ${date}
        Time: ${time}
        Department: ${department}
        Doctor: ${doctor}
        Message: ${message}
        New Patient: ${newPatient ? 'Yes' : 'No'}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        console.error("Nodemailer error:", error);
        res.status(500).json({ message: 'Failed to book appointment', error: error.message });
    }
});

// Main Route - Single page application approach
app.get('/', (req, res) => {
  res.render('index', { title: 'AlHussain Health - Leading Healthcare Provider' });
});

// Route for appointment page
app.get('/appointment', (req, res) => {
  res.render('appointment', { title: 'Book an Appointment - AlHussain Health' });
});

// Supporting routes for backward compatibility
app.get('/about', (req, res) => {
  res.redirect('/#about-section');
});

app.get('/departments', (req, res) => {
  res.redirect('/#departments-section');
});

app.get('/doctors', (req, res) => {
  res.redirect('/#doctors-section');
});

app.get('/gallery', (req, res) => {
  res.redirect('/#gallery-section');
});

app.get('/contact', (req, res) => {
  res.redirect('/#contact-section');
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Define port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
