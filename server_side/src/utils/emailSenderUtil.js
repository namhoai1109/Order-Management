const nodemailer = require('nodemailer')
const config = require('../configs')

// protonmail
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: config.emailSenderUser,
    pass: config.emailSenderPassword
  }
})

exports.sendEmail = async (to, link) => {
  console.log(to)
  const mailOptions = {
    from: 'Hieu Nguyen',
    to: to,
    subject: 'Thank you for registering to our service, please click the link below to validate your account',
    html: `<a href="${link}">Click here to validate your account</a`
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}
