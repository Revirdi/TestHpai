const express = require("express");
const { userController } = require("../controller");
const routers = express.Router();

routers.post("/", userController.addUser);
routers.get("/", userController.getUser);

module.exports = routers;
