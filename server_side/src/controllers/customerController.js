const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
// const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const { hashPassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')
const { sendConfirmEmail } = require('../utils/emailSenderUtil')
const config = require('../configs')

exports.viewProfile = async (req, res) => {
  try {
    console.log(req.account)
    const customer = await prisma.customer.findUnique({
      where: {
        accountId: req.account.id
      }
    })
    res.status(200).send(createReturnObject(customer, '', 'Customer profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.register = async (req, res) => {
  try {
    // check unique constraint
    const account = await prisma.account.findFirst({
      where: {
        OR: [
          { email: req.body.email },
          { username: req.body.username },
          { phone: req.body.phone }
        ]
      }
    })

    if (account) {
      res.status(400).send(createReturnObject(null, 'Error registering account', 'Unique constraint', 400))
      return
    }

    const hashedPassword = await hashPassword(req.body.password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          phone: req.body.phone,
          role: 'customer'
        }
      })
      await prisma.customer.create({
        data: {
          name: req.body.name,
          address: req.body.address,
          account: {
            connect: {
              id: account.id
            }
          }
        }
      })
      const token = jwt.sign({
        id: account.id
      },
      config.jwtToken,
      { expiresIn: '1d' }
      )

      // send email verification
      const link = `${config.hostUrl}/api/auth/confirmation/${token}`
      await sendConfirmEmail(req.body.email, link)

      res.status(201).send(createReturnObject(link, '', 'Account registered successfully', 201))
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error registering customer', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.updatePassword = async (req, res) => {
  try {
    const isMatch = await bcrypt.compare(req.body.oldPassword, req.account.password)
    if (!isMatch) {
      res.status(405).send(createReturnObject(null, 'Password mismatch', 'Old password is incorrect', 405))
      return
    }

    const hashedPassword = await hashPassword(req.body.newPassword)
    await prisma.$transaction(async (prisma) => {
      await prisma.account.update({
        where: {
          id: req.account.id
        },
        data: {
          password: hashedPassword
        }
      })
    })

    res.status(200).send(createReturnObject(null, '', 'Password updated successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error updating password', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getPartners = async (req, res) => {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        account: {
          isConfirmed: true
        }
      },
      select: {
        id: true,
        brandName: true,
        culinaryStyle: true,
        status: true,
        branches: {
          select: {
            id: true,
            address: true
          }
        },
        account: {
          select: {
            id: true,
            email: true,
            phone: true
          }
        }
      }
    })
    res.status(200).send(createReturnObject(partners, '', 'Partners retrieved successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error getting partners', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getDishes = async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany({
      where: {
        // string to int
        partnerId: parseInt(req.params.partnerId)
      },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        rating: true,
        partner: {
          select: {
            id: true,
            brandName: true
          }
        },
        dishDetails: true,
        images: true
      }
    })
    res.status(200).send(createReturnObject(dishes, '', 'Dishes retrieved successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error getting dishes', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.createOrder = async (req, res) => {
  try {
    
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error creating order', 500))
  } finally {
    await prisma.$disconnect()
  }
}
