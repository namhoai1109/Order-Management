const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const config = require('../configs')
const { hashPassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')

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
          isConfirmed: true
        }
      })
    })
  } catch (err) {
    console.log(err)
    // return res.status(500).json(createReturnObject(null, err.message, 'Unique constraint', 500))
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
          isConfirmed: true
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

    return res.status(200).json(createReturnObject(null, 'Staff account created', 'Success', 200))
  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(null, err.message, 'Unique constraint', 500))
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

    return res.status(200).json(createReturnObject(null, 'Staff account deleted', 'Success', 200))
  } catch (err) {
    console.log(err)
    return res.status(500).json(createReturnObject(null, err.message, 'Unique constraint', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.updateStatusAccount = async (req, res) => {
  try {
    const existingAccount = await prisma.account.findUnique({ where: { id: parseInt(req.params.id) } })
    if (existingAccount.status === 'active') {
      await prisma.$transaction(async (prisma) => {
        await prisma.account.update({
          where: {
            id: parseInt(req.params.id)
          },
          data: {
            status: 'inactive'
          }
        })
      })
    } else {
      await prisma.$transaction(async (prisma) => {
        await prisma.account.update({
          where: {
            id: parseInt(req.params.id)
          },
          data: {
            status: 'active'
          }
        })
      })
    }

    res.status(200).send(createReturnObject(null, 'Account status updated successfully', 200))
  } catch (err) {
    console.log(err)
    if (err.code === 'P2002') {
      res.status(400).send(createReturnObject(null, err.message, 'Transaction failed', 400))
      return
    }

    res.status(500).send(createReturnObject(null, err.message, 'Error', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getStaff = async (req, res) => {
  try {
    console.log(req.account)
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(req.params.id)
      }
    })

    res.status(200).send(createReturnObject(staff, '', 'Staff profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getAllStaff = async (req, res) => {
  try {
    // console.log(req.account);
    const staffs = await prisma.account.findMany({
      where: {
        role: 'staff'
      }
    })

    res.status(200).send(createReturnObject(staffs, '', 'Staffs profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getAllAccount = async (req, res) => {
  try {
    // console.log(req.account);
    const shippers = await prisma.account.findMany()

    res.status(200).send(createReturnObject(shippers, '', 'Shippers profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}



exports.getAllShipper = async (req, res) => {
  try {
    console.log(req.account)
    const shipper = await prisma.account.findMany({
      where:{
        role: 'shipper'
      },
      include:{
        shipper :{
          select:{
            districtId: true,
            orders: true,
            name: true,
            address: true,
            licensePlate: true
          }
        }
      }
    })

    res.status(200).send(createReturnObject(shipper, '', 'Shippers profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getActiveShippers = async (req, res) => {
  try {
    console.log(req.account)
    // const shipper = await prisma.$queryRaw`
    // SELECT * FROM Account acc
    // JOIN Shipper s ON acc.username = s.name
    // WHERE acc.role = 'shipper' AND acc.status = 'active'`
    const shipper = await prisma.account.findMany({
      where:{
        role: 'shipper',
        status : 'active'
      
      },
      include:{
        shipper :{
          select:{
            districtId: true,
            orders: true,
            name: true,
            address: true,
            licensePlate: true
          }
        }
      }
    })


    res.status(200).send(createReturnObject(shipper, '', 'Shippers profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}

