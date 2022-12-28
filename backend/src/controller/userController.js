const pool = require("../lib/databases");
const { hash } = require("../lib/bcrypt");

module.exports = {
  addUser: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const connection = pool.promise();

      // Cek email duplicate

      const sqlGetUser = `SELECT email FROM users WHERE email = ?`;
      const dataGetUser = [email];
      const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

      if (resGetUser.length)
        return res.status(400).send({ message: "Email is already exists" });

      const sqlGetRole = `SELECT role_id FROM roles WHERE roles = ?`;
      const dataGetRole = [role];
      const [resGetRole] = await connection.query(sqlGetRole, dataGetRole);

      const role_id = resGetRole[0].role_id;

      const encryptedPassword = hash(password);

      const sqlCreateUser = `INSERT INTO users SET ?`;
      const dataCreateUser = [
        {
          name,
          email,
          password: encryptedPassword,
          role_id,
        },
      ];
      const [resCreateUser] = await connection.query(
        sqlCreateUser,
        dataCreateUser
      );
      res.status(200).send({
        message: "Success create new user",
        data: resCreateUser,
      });
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};
