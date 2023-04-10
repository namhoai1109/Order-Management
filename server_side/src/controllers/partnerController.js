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
      taxCode,
      representative,
      culinaryStyle,
      username,
      password,
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
          email,
          phone,
          bankAccount,
          role: 'partner'
        }
      })

      await prisma.partner.create({
        data: {
          brandName,
          taxCode,
          representative,
          orderQuantity: 20,
          status: 'active',
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

      res.status(201).send(createReturnObject(null, '', 'Partner registered successfully', 201))
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}

// exports.getContract = async (req, res) => {
//   try {
//     const { accessCode } = req.params

//     const partner = await prisma.partner.findUnique({
//       where: {
//         accessCode
//       },
//       include: {
//         account: true,
//         branches: true
//       }
//     })

//     if (!partner) {
//       res.status(404).send(createReturnObject(null, 'Partner not found', '', 404))
//     }

//     res.status(200).send(createReturnObject(partner, '', '', 200))
//   } catch (err) {

//   }
// }

exports.addDish = async (req, res) => {
  try {
    const { name, status, description } = req.body
    const dishDetails = JSON.parse(req.body.dishDetails)
    const partner = await prisma.partner.findUnique({
      where: {
        accountId: req.account.id
      }
    })

    if (!partner) {
      res.status(404).send(createReturnObject(null, 'Partner not found', '', 404))
    }

    const imagesData = req.files.map(file => ({
      filename: file.filename
    }))
    const dishDetailsData = dishDetails.map((dishDetail) => ({
      name: dishDetail.name,
      price: dishDetail.price
    }))

    await prisma.$transaction(async (prisma) => {
      await prisma.dish.create({
        data: {
          name,
          description,
          status,
          partner: {
            connect: {
              id: partner.id
            }
          },
          dishDetails: {
            create: dishDetailsData
          },
          images: {
            create: imagesData
          }
        }
      })
    })

    res.status(201).send(createReturnObject(null, '', 'Dish added successfully', 201))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, 'Error adding dish', err.message, 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getAllDishes = async (req, res) => {
  try {
    const partner = await prisma.partner.findUnique({
      where: {
        accountId: req.account.id
      }
    })

    if (!partner) {
      res.status(404).send(createReturnObject(null, 'Partner not found', '', 404))
    }

    const dishes = await prisma.dish.findMany({
      where: {
        partnerId: partner.id
      },
      include: {
        dishDetails: true,
        images: true
      }
    })

    res.status(200).send(createReturnObject(dishes, '', '', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, 'Error getting dishes', err.message, 500))
  } finally {
    await prisma.$disconnect()
  }
}
