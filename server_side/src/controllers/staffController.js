const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const config = require('../configs')
const { createReturnObject } = require('../utils/returnObjectUtil')
const { generateContract } = require('../utils/contractUtil')
const { sendContract } = require('../utils/emailSenderUtil')

exports.getAllPartners = async (req, res) => {
  try {
    const partners = await prisma.partner.findMany({
      include: {
        account: true,
        contract: true
      }
    })

    res.status(200).send(createReturnObject(partners, 'Success', 'Success', 200))
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Internal server error', 500))
  }
}

exports.generateContract = async (req, res) => {
  try {
    const partner = await prisma.partner.findUnique({
      where: {
        taxCode: req.params.taxCode
      },
      include: {
        account: true,
        contract: true,
        branches: true
      }
    })

    if (!partner) {
      res.status(404).send(createReturnObject(null, 'Partner not found', 'Partner not found', 404))
      return
    }

    if (partner.contract) {
      res.status(400).send(createReturnObject(null, 'Contract already exists', 'Contract already exists', 400))
      return
    }

    const accessCode = jwt.sign({ id: partner.id }, config.jwtToken)
    await prisma.$transaction(async (prisma) => {
      const contract = await prisma.contract.create({
        data: {
          accessCode,
          taxCode: partner.taxCode,
          representative: partner.representative,
          bankAccount: partner.account.bankAccount,
          partner: {
            connect: {
              id: partner.id
            }
          }
        }
      })

      generateContract(partner, contract)
      sendContract(partner.account.email, contract)
    })

    // TODO: send email with contract to partner
    res.status(200).send(createReturnObject(null, 'Contract generated', 'Contract generated', 200))

  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Contract generation failed', 500))
  } finally {
    await prisma.$disconnect()
  }
}