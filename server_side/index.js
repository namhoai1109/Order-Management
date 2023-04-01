const express = require('express')
const cors = require('cors')
const ejs = require('ejs')
const config = require('./src/configs')
const path = require('path')

// create express app
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

// middlewares
// const { authorizeUser } = require('./src/middlewares/auth')

// controllers
const adminController = require('./src/controllers/adminController')
const locationController = require('./src/controllers/locationController')

// routers
const adminRouter = require('./src/routes/adminRoute')
const authRouter = require('./src/routes/authRoute')
const customerRouter = require('./src/routes/customerRoute')
const partnerRouter = require('./src/routes/partnerRoute')
const locationRouter = require('./src/routes/locationRoute')
const shipperRouter = require('./src/routes/shipperRoute')

// mount routes
app.use('/api/admin', adminRouter)
app.use('/api/auth', authRouter)
app.use('/api/customers', customerRouter)
app.use('/api/partners', partnerRouter)
app.use('/api/shippers', shipperRouter)
app.use('/api/locations', locationRouter)

// root route
app.get('/', (req, res) => {
  res.send('Hello World')
})

// 404
app.use((req, res) => {
  res.status(404).render('404')
})

// start server
const port = config.port || 8080
app.listen(port, () => {
  // init database
  adminController.register()
  locationController.register()

  console.log(`Server is running on ${config.hostUrl}`)
})
