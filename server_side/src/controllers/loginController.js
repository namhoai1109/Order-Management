const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const config = require('../configs')
const { comparePassword } = require('../utils/passwordUtil')
const { createReturnObject } = require('../utils/returnObjectUtil')

exports.login = async (req, res) => {
  try {
    await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: {
          username: req.body.username
        }
      })
      // if account doesn't exist
      if (!account) {
        res.status(401).send(createReturnObject(null, '', 'Invalid username or password', 401))
        return
      }

      // if password doesn't match
      const storedPassword = account.password
      const isMatch = await comparePassword(req.body.password, storedPassword)
      if (!isMatch) {
        res.status(401).send(createReturnObject(null, '', 'Invalid username or password', 401))
        return
      }

      // if account is inactive
      if (account.status === 'inactive') {
        res.status(401).send(createReturnObject(null, '', 'Invalid username or password', 401))
        return
      }

      // if everything checks out
      const token = jwt.sign({ id: account.id }, config.jwtToken)
      const returnObject = {
        token,
        username: account.username,
        role: account.role
      }

      res.status(200).send(createReturnObject(returnObject, '', 'Login successfully', 200))
    })
  } catch (err) {
    console.log(err)
    res.status(500).send(createReturnObject(null, err.message, 'Login failed', 401))
  }
}
