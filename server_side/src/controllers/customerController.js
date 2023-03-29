const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
// const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const { hashPassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')
const { sendEmail } = require('../utils/emailSenderUtil')
const config = require('../configs')

exports.getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany()
    res.send(customers)
  } catch (err) {
    console.log(err)
  } finally {
    await prisma.$disconnect()
  }
}

exports.registerCustomer = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
          role: req.body.role
        }
      })
      await prisma.customer.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          account: {
            connect: {
              id: account.id
            }
          }
        }
      })
      const token = jwt.sign({
        id: account.id,
      },
        config.jwtToken,
        { expiresIn: '10m' }
      )

      // send email verification
      const link = `${config.hostUrl}/api/confirmation/${token}`
      await sendEmail(req.body.email, link)

      res.status(201).send(createReturnObject(token, '', 'Account registered successfully', 201))
    })

  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  } finally {
    await prisma.$disconnect()
  }
}
