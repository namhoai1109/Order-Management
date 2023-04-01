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
    const { email, username, password, name, phone, address, nationalId, licensePlate, bankAccount, districtId } = req.body
    const hashedPassword = await hashPassword(password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username,
          password: hashedPassword,
          email,
          phone,
          nationalId,
          licensePlate,
          // bankAccount,
          role: 'shipper'
        }
      })

      await prisma.shipper.create({
        data: {       
          name,
          address,  
          account: {
            connect: {
              id: account.id
            }
          },
          district: {
            connect: {
              id: districtId
            }
          }
        }
      })

      const token = jwt.sign({ id: account.id }, config.jwtToken, { expiresIn: '1d' })
      const link = `${config.hostUrl}/api/auth/confirmation/${token}`
      await sendEmail(email, link)

      return res.status(200).json(createReturnObject(link, '', 'Register successfully', 200))
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(null, err.message, "Unique constraint", 500))

  } finally {
    await prisma.$disconnect()
  }
}