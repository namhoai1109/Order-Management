const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
// const path = require('path')
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
    return res.status(500).json(createReturnObject(null, err.message, 'Unique constraint', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.viewProfile = async (req, res) => {
  try {
    const shipper = await prisma.shipper.findUnique({
      where: {
        accountId: req.account.id
      },
      include: {
        district: {
          select: {
            id: true,
            name: true,
            city: true
          }
        },
        account: {
          select: {
            id: true,
            username: true,
            email: true,
            phone: true,
            nationalId: true,
            bankAccount: true
          }
        }
      }
    })

    res.status(200).send(createReturnObject(shipper, '', 'Shipper profile viewed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error viewing profile', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.getOrders = async (req, res) => {
  try {
    const { process } = req.params
    const shipper = await prisma.shipper.findUnique({
      where: {
        accountId: req.account.id
      }
    })
    if (!shipper) {
      res.status(400).send(createReturnObject(null, 'Error getting orders', 'Shipper not found', 400))
      return
    }

    const orders = await prisma.order.findMany({
      where: {
        branch: {
          district: {
            id: shipper.districtId
          }
        },
        status: 'confirmed',
        // eslint-disable-next-line multiline-ternary
        shipper: process === 'pending' ? null : {
          id: shipper.id
        }
      },
      select: {
        id: true,
        orderCode: true,
        createdAt: true,
        deliveredAt: true,
        status: true,
        process: true,
        orderPrice: true,
        shippingPrice: true,
        totalPrice: true,
        shipper: {
          select: {
            id: true,
            name: true,
            address: true,
            licensePlate: true,
            account: {
              select: {
                id: true,
                phone: true,
                email: true,
                nationalId: true
              }
            }
          }
        },
        customer: {
          select: {
            id: true,
            name: true,
            address: true,
            account: {
              select: {
                id: true,
                phone: true
              }
            }
          }
        },
        orderDetails: {
          select: {
            id: true,
            dishId: true,
            dishDetailId: true,
            dishName: true,
            dishDetailName: true,
            quantity: true,
            totalPrice: true
          }
        },
        branch: {
          select: {
            id: true,
            address: true,
            district: {
              select: {
                id: true,
                name: true,
                city: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    })

    const orderDetailList = await prisma.orderDetail.findMany({
      where: {
        orderId: {
          in: orders.map(order => order.id)
        }
      }
    })

    const response = orders.map(order => {
      const orderDetails = orderDetailList.filter(orderDetail => orderDetail.orderId === order.id)
      return {
        ...order,
        orderDetails
      }
    })

    res.status(200).send(createReturnObject(response, '', 'Orders retrieved successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error getting orders', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const shipper = await prisma.shipper.findUnique({
      where: {
        accountId: req.account.id
      }
    })
    if (!shipper) {
      res.status(400).send(createReturnObject(null, 'Error getting orders', 'Shipper not found', 400))
      return
    }

    await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.findUnique({
        where: {
          orderCode: req.params.orderCode
        }
      })
      order.process = req.body.process
      order.shippingPrice = 25000
      order.totalPrice = order.orderPrice + order.shippingPrice
      await prisma.order.update({
        where: {
          orderCode: req.params.orderCode
        },
        data: {
          process: order.process,
          shippingPrice: order.shippingPrice,
          totalPrice: order.totalPrice,
          shipper: {
            connect: {
              id: shipper.id
            }
          }
        }
      })
    })

    res.status(200).send(createReturnObject(null, '', 'Order confirmed successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error confirming order', 500))
  } finally {
    await prisma.$disconnect()
  }
}

exports.deliverOrder = async (req, res) => {
  try {
    const shipper = await prisma.shipper.findUnique({
      where: {
        accountId: req.account.id
      }
    })
    if (!shipper) {
      res.status(400).send(createReturnObject(null, 'Error getting orders', 'Shipper not found', 400))
      return
    }

    await prisma.$transaction(async (prisma) => {
      const order = await prisma.order.findUnique({
        where: {
          orderCode: req.params.orderCode
        },
        include: {
          orderDetails: true
        }
      })
      await prisma.order.update({
        where: {
          orderCode: req.params.orderCode
        },
        data: {
          process: 'delivered',
          deliveredAt: new Date()
        }
      })

      // update stock
      for (const orderDetail of order.orderDetails) {
        await prisma.dishDetail.update({
          where: {
            id: orderDetail.dishDetailId
          },
          data: {
            quantity: {
              decrement: orderDetail.quantity
            }
          }
        })
      }
    })

    res.status(200).send(createReturnObject(null, '', 'Order delivered successfully', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Error delivering order', 500))
  } finally {
    await prisma.$disconnect()
  }
}
