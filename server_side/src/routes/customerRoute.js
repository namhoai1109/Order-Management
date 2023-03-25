const router = require("express").Router();
const controller = require("../controllers/customerController");
const {authorizeUser} = require("../middlewares/auth");

router.get("/", authorizeUser("customer"), controller.getCustomers);
router.post("/", controller.registerCustomer);

module.exports = router;