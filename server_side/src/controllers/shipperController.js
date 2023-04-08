const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const path = require('path')
const config = require('../configs')
const { createReturnObject } = require('../utils/returnObjectUtil')
const { hashPassword } = require('../utils/passwordUtil')
const { sendConfirmEmail } = require('../utils/emailSenderUtil')

exports.register = async (req, res) => {
  try {
    const { email, username, password, name, phone, address, nationalId, licensePlate, bankAccount, districtId } = req.body
    // check unique constraint
    const account = await prisma.account.findFirst({
      where: {
        OR: [
          { email },
          { username },
          { phone },
          { nationalId },
          { bankAccount }
        ]
      }
    })
    if (account) {
      res.status(400).send(createReturnObject(null, 'Error registering account', 'Unique constraint', 400))
      return
    }

    const hashedPassword = await hashPassword(password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username,
          password: hashedPassword,
          email,
          phone,
          nationalId,
          bankAccount,
          role: 'shipper'
        }
      })

      await prisma.shipper.create({
        data: {
          name,
          address,
          licensePlate,
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
      await sendConfirmEmail(email, link)

      return res.status(200).json(createReturnObject(link, '', 'Register successfully', 200))
    })

  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(null, err.message, "Unique constraint", 500))

  } finally {
    await prisma.$disconnect()
  }
}

exports.getShipper = async (req, res) => {
  try {
    console.log(req.account)
    const username = req.params.username
    const shipper = await prisma.$queryRaw`
    SELECT * FROM Account acc
    JOIN Shipper s ON acc.username = s.name
    WHERE acc.username = ${username}`

    res.status(200).send(createReturnObject(shipper, '', 'Shipper profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}