const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (your HTML/CSS)
app.use(express.static('public'));

// POST handler for contact form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  console.log('New Message:', name, email, message);

  // Set up email transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yajurva.satyanarayanareddy@gmail.com',
      pass: 'voopmqpamuwnctkm' // not your real password
    }
  });

  const mailOptions = {
    from: email,
    to: 'yajurva.satyanarayanareddy@gmail.com',
    subject: 'New Contact Form Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error:', error);
    res.send('❌ Error sending message.');
  } else {
    console.log('Email sent:', info.response);
    res.send(`✅ Thanks ${name}, your message has been sent! We will get back to you soon.`);
  }
});

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
