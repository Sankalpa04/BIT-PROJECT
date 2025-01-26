import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  host: process.env.HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
})

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: "sankalpa044@gmail.com",
    to,
    subject,
    html,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw error
  }
}

export default sendMail