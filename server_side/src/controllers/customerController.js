const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()
const { hashPassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')

exports.getAll = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany()
    res.send(createReturnObject(customers, '', 'Customers fetched successfully', 200))

  } catch (err) {
    console.log(err)
    res.send(createReturnObject(null, err.message, 'Error fetching customers', 500))

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
    const hashedPassword = await hashPassword(req.body.password)
    await prisma.account.update({
      where: {
        id: req.body.id
      },
      data: {
        password: hashedPassword
      }
    })
    res.status(200).send(createReturnObject(null, '', 'Password updated successfully', 200))
    
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error updating password', 500))

  } finally {
    await prisma.$disconnect()
  }
}
