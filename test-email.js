require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTest() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,          // send to yourself
    subject: "Nodemailer + Gmail Test",
    text: "If you see this, nodemailer is configured correctly!",
  });

  console.log("Message sent:", info.messageId);
}

sendTest().catch(console.error);
