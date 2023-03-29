const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const config = require('../configs')
const { hashPassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')
const { sendEmail } = require('../utils/emailSenderUtil')

// TODO: implement register
exports.register = async (req, res) => {
  try {
    const { 
      brandName,
      email,
      phone,
      bankAccount,
      representative,
      orderQuantity,
      status,
      culinaryStyle,
      username,
      password ,
      branches
    } = req.body

    const branchesObj = branches.map(branch => ({
      address: branch.address,
      district: {
        connect: {
          id: branch.districtId
        }
      }
    }))

    const hashedPassword = await hashPassword(password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username,
          password: hashedPassword,
          role: 'partner',
        }
      })

      const partner = await prisma.partner.create({
        data: {
          brandName,
          email,
          phone,
          bankAccount,
          representative,
          orderQuantity: 20,
          status: "active",
          culinaryStyle,
          account: {
            connect: {
              id: account.id
            }
          },
          branches: {
            create: branchesObj
          }
        },
        include: {
          branches: true
        }
      })

      const token = jwt.sign({
        id: account.id,
      },
        config.jwtToken,
        // { expiresIn: '10m' }
      )

      const link = `${config.hostUrl}/api/confirmation/${token}`
      await sendEmail(req.body.email, link)

      res.status(201).send(createReturnObject(token, '', 'Partner registered successfully', 201))
    })

  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}