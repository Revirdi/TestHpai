const { hash, compare } = require("../lib/bcrypt");
const { createToken } = require("../lib/token");
const pool = require("../lib/databases");

module.exports = {
  login: async (req, res) => {
    try {
      //   const { email, password } = req.body;

      console.log("mantap");
      res.send("mantap");
    } catch (error) {}
  },
};
