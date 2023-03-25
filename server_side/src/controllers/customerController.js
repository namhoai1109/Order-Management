const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { hashPassword } = require('../utils/passwordUtil')

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
    })

    res.send({ message: 'Customer created successfully' })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  } finally {
    await prisma.$disconnect()
  }
}
