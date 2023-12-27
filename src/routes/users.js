const express = require("express");
const router = express.Router();

const userController = require("../app/controller/UserController");

router.get("/storage", userController.index);
router.get("/login", userController.loginPage);

module.exports = router;
