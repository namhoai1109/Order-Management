const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const config = require('../configs')

const { createReturnObject } = require('../utils/returnObjectUtil')

const authorizeUser = function (...roles) {
  return async (req, res, next) => {
    // get the token from the header
    try {
      if (!req.headers.authorization) {
        res.status(400).send(createReturnObject(null, '', 'Authorization header is required', 400))
        return
      }
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, config.jwtToken)
      const account = await prisma.account.findUnique({
        where: {
          id: decoded.id
        }
      })
      if (!account) {
        res.status(401).send(createReturnObject(null, '', 'Account not found', 401))
        return
      }
      if (!roles.includes(account.role)) {
        res.status(401).send(createReturnObject(null, '', 'Permission denied', 401))
        return
      }
      if (account.status !== 'active') {
        res.status(401).send(createReturnObject(null, '', 'Account is disabled', 401))
        return
      }
      
      req.account = account
      next()

    } catch (err) {
      console.log(err)
      res.status(500).send(createReturnObject(null, err.message, 'Something went wrong', 500))
    }
  }
}

module.exports = { authorizeUser }
