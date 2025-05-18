// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
app.post('/send', (req, res) => {
  const { name, email, message } = req.body;

  // Setup your email details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ateebmazhar17@gmail.com',       // 🔁 Your Gmail
      pass: 'gqef ryde vwhr nonc'       // 🔁 App password (not normal password)
    }
  });

  const mailOptions = {
    from: email,
    to: 'ateebmazhar17@gmail.com',          // 🔁 Where you want to receive it
    subject: `Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Error sending email.");
    }
    res.send("Email sent successfully!");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
