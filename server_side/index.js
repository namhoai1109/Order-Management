const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const config = require("./src/configs");

// middlewares
const {authorizeUser} = require("./src/middlewares/auth");

// routers
const authRouter = require("./src/routes/authRoute");
const customerRouter = require("./src/routes/customerRoute");

// controllers
const userController = require("./src/controllers/customerController");

// create express app
const app = express();
app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// mount routes
app.use("/api/login", authRouter);
app.use("/api/customers", customerRouter);

// start server
const port = config.port || 8080;
app.listen(port, () => {
  console.log(`Server is running on ${config.hostUrl}`);
});