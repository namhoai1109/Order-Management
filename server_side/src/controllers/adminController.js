const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const config = require('../configs')
const { hashPassword } = require('../utils/passwordUtil')

exports.register = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(config.adminPassword)
    const existingAccount = await prisma.account.findUnique({ where: { username: 'admin' } })

    if (existingAccount) {
      return
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.account.create({
        data: {
          username: config.adminUsername,
          password: hashedPassword,
          role: 'admin',
          confirmed: true
        }
      })
    })

  } catch (err) {
    console.log(err)
    // return res.status(500).json(createReturnObject(null, err.message, "Unique constraint", 500))

  } finally {
    await prisma.$disconnect()
  }
}

exports.registerStaff = async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)
    await prisma.$transaction(async (prisma) => {
      const account = await prisma.account.create({
        data: {
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          phone: req.body.phone,
          role: 'staff',
          confirmed: true
        }
      })

      await prisma.staff.create({
        data: {
          name: req.body.name,
          account: {
            connect: {
              id: account.id
            }
          }
        }
      })
    })

    return res.status(200).json(createReturnObject(null, "Staff account created", "Success", 200))
  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(null, err.message, "Unique constraint", 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.deleteStaff = async (req, res) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.staff.delete({
        where: {
          accountId: parseInt(req.params.id)
        }
      })

      await prisma.account.delete({
        where: {
          id: parseInt(req.params.id)
        }
      })
    })

    return res.status(200).json(createReturnObject(null, "Staff account deleted", "Success", 200))

  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(null, err.message, "Unique constraint", 500))

  } finally {
    await prisma.$disconnect()
  }
}