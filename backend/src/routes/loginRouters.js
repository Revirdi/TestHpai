const express = require("express");
const { loginController } = require("../controller");
const routers = express.Router();

routers.post("/", loginController.login);

module.exports = routers;
