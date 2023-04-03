const nodemailer = require('nodemailer')
const SendinblueTransport = require('nodemailer-sendinblue-transport')
const config = require('../configs')
const path = require('path')

// protonmail
// const transporter = nodemailer.createTransport(
//   new SendinblueTransport({
//     apiKey: config.sendinblueApiKey
//   })
// );

// ethereal
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: config.etherealUsername,
      pass: config.etherealPassword
  }
});

exports.sendConfirmEmail = async (to, link) => {
  const mailOptions = {
    from: 'demo@example.com',
    to: to,
    subject: 'Email confirmation',
    html: `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            * {
                margin: 15px;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                background-color: #f5f5f5;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            h1 {
                font-size: 2rem;
                color: #333333;
                margin-bottom: 10px;
            }
            a {
                text-decoration: none;
                color: #ffffff;
                font-size: 1.2rem;
            } 
            p {
                font-size: 1.2rem;
                color: #333333;
             }
            button {
                background-color: #333;
                color: #ffffff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-bottom: 40px;
            }  
            button:hover {
                background-color: #4a4a4a;
            } 
        </style>
    </head>
    <body>
        <h1>Confirm Your Email Address</h1>
        <p>Thanks for signing up! We just need you to confirm your email address. Just press the button below.</p>
        <button>
            <a href=${link}>Confirm Email</a>
        </button>
        <p>Cheers,</p>
        <p>Team</p>
    </body>
    </html>
    `
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}

exports.sendContract = async (to, contract) => {
  const mailOptions = {
    from: 'demo@example.com',
    to: to,
    subject: 'Contract Detail',
    attachments: [
      {
        filename: "Contract.txt",
        path: path.join(__dirname, `../../data/contracts/${contract.taxCode}.txt`)
      }
    ]
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
}
