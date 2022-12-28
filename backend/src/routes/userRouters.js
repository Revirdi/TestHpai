const express = require("express");
const { userController } = require("../controller");
const auth = require("../helper/auth");
const routers = express.Router();

routers.post("/", auth, userController.addUser);
routers.get("/", auth, userController.getUser);
routers.get("/:id", auth, userController.getUserById);
routers.delete("/:id", auth, userController.deleteUser);

module.exports = routers;
