const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const path = require('path')
const config = require('../configs')
const { createReturnObject } = require('../utils/returnObjectUtil')
const { hashPassword } = require('../utils/passwordUtil')
const { sendEmail } = require('../utils/emailSenderUtil')

exports.register = async (req, res) => {
  try {
    const { email, username, password, name, phone, address, nationalId, licensePlate, bankAccount } = req.body
    const hashedPassword = await hashPassword(password)
    await prisma.$transaction(async (prisma) => {
      const shipper = await prisma.shipper.create({
        data: {
          username,
          password: hashedPassword,
          name,
          phone,
          address,
          email,
          nationalId,
          licensePlate,
          bankAccount
        }
      })

      const token = jwt.sign({ id: shipper.id }, config.jwtSecret, { expiresIn: '1d' })
      const link = `${config.clientUrl}/api/auth/confirmation/${token}`
      await sendEmail(email, link)

      return res.status(200).json(createReturnObject(link, 'Register successfully', { token }))
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(false, 'Register failed', err))

  } finally {
    await prisma.$disconnect()
  }
}