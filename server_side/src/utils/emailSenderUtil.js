const nodemailer = require('nodemailer')

// protonmail
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'cleta.bayer@ethereal.email',
    pass: 'B4D6n5J4PtbaVrbxh6'
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
