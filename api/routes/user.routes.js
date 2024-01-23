const express = require("express");
const { signup, signin, logout } = require("../controllers/user.controller");

// initializing router
const router = express.Router();

// api endpoint for signup with controller function
router.post("/register", signup);
// api endpoint for signin with controller function
router.post("/login", signin);
// api endpoint for logout with controller function
router.get("/logout", logout)

//exporting router
module.exports = router;