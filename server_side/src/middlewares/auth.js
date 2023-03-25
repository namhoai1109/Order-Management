const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const config = require('../configs')

const authorizeUser = function (...roles) {
  return async (req, res, next) => {
    // get the token from the header
    try {
      if (req.headers?.authorization?.startsWith('Bearer ')) {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, config.jwtToken)
        const account = await prisma.account.findUnique({
          where: {
            id: decoded.id
          }
        })
        if (!account) {
          res.status(401).send({ message: 'Invalid token' })
        }
        if (roles.includes(account.role)) {
          if (account.status === 'active') {
            next()
          } else {
            res.status(401).send({ message: 'Account is inactive' })
          }
        } else {
          res.status(401).send({ message: 'Permission denied' })
        }
      } else {
        res.status(401).send({ message: 'Invalid token' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).send({ message: err.message })
    }
  }
}

module.exports = { authorizeUser }
