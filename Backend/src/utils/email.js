const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Use dynamic import for nodemailer-express-handlebars (ESM)
dotenv.config();

async function sendEmail({
  to,
  subject,
  name,
  message,
  title,
  template
}) {
  const hbs = (await import('nodemailer-express-handlebars')).default;  // Dynamic import
  
  const __dirname = path.resolve();
  console.log(process.env.USER, 'user')
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const hbsOptions = {
    viewEngine: {
      defaultLayout: 'baseMessage', // Ensure you have a baseMessage layout
      layoutsDir: path.resolve(__dirname, '../Backend/src/views'),
      partialsDir: path.resolve(__dirname, '../Backend/src/views'),
    },
    viewPath: path.resolve(__dirname, '../Backend/src/views'),
  };

  transporter.use('compile', hbs(hbsOptions));
 console.log(to,'toooooooo')
  try {
    const mailDetails = {
      from: process.env.USER,
      to: to,
      subject: subject,
      title: title,
      template: template,
      context: {
        name: name,
        message: message,
      },
    };

    const response = await transporter.sendMail(mailDetails);
    console.log(response, 'info after sending email');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;
