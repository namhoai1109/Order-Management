const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')
const { hashPassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')

exports.viewProfile = async (req, res) => {
  try {
    console.log(req.account);
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
    const hashedPassword = await hashPassword(req.body.password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
          role: 'customer'
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
    })

    res.status(201).send(createReturnObject(null, '', 'Customer registered successfully', 201))

  } catch (err) {
    console.log(err)
    if (err.code === 'P2002') {
      res.status(400).send(createReturnObject(null, 'Unique constraint', 'Some field are already existed', 400))
      return
    }

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
