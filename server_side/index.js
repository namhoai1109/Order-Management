const express = require('express')
const cors = require('cors')
const config = require('./src/configs')
const path = require('path')

// create express app
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

// middlewares
// const { authorizeUser } = require('./src/middlewares/auth')

// controllers
const locationController = require('./src/controllers/locationController')

// routers
const authRouter = require('./src/routes/authRoute')
const customerRouter = require('./src/routes/customerRoute')
const partnerRouter = require('./src/routes/partnerRoute')
const locationRouter = require('./src/routes/locationRoute')

// mount routes
app.use('/api/auth', authRouter)
app.use('/api/customers', customerRouter)
app.use('/api/partners', partnerRouter)
app.use('/api/locations', locationRouter)

// root route

app.get('/', (req, res) => {
  res.send('Hello world')
})

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '/public/pages/404.html'))
})

// start server
const port = config.port || 8080
app.listen(port, () => {
  locationController.register()
  console.log(`Server is running on ${config.hostUrl}`)
})
