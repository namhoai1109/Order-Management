const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
// const { hashPassword } = require('../utils/passwordUtil')

exports.register = async (req, res) => {
  try {

  } catch (err) {
    console.log(err)
    res.status(500).send({ message: err.message })
  }
}