const express = require("express");
const { userController } = require("../controller");
const auth = require("../helper/auth");
const routers = express.Router();

routers.post("/", auth, userController.addUser);
routers.get("/", auth, userController.getUser);

module.exports = routers;
