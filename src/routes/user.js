const router = require("express").Router();
const { CreateUser, loginUser } = require("../controllers/user");

// user Registration route
router.post("/register", CreateUser);

// user Login route
router.post("/login", loginUser);

module.exports = router;
