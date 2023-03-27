const express = require('express')
const cors = require('cors')
const config = require('./src/configs')

// create express app
const app = express()
app.use(cors())
app.use(express.json())

// middlewares
// const { authorizeUser } = require('./src/middlewares/auth')

// controllers
// const userController = require('./src/controllers/customerController')

// routers
const authRouter = require('./src/routes/authRoute')
const customerRouter = require('./src/routes/customerRoute')
const partnerRouter = require('./src/routes/partnerRoute')

// mount routes
app.use('/api/login', authRouter)
app.use('/api/customers', customerRouter)
app.use('/api/partners', partnerRouter)

// root route
app.get('/', (req, res) => {
  res.send('Hello world')
})



// start server
const port = config.port || 8080
app.listen(port, () => {
  console.log(`Server is running on ${config.hostUrl}`)
})
