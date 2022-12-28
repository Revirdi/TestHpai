const pool = require("../lib/databases");
const { hash } = require("../lib/bcrypt");

module.exports = {
  addUser: async (req, res) => {
    try {
      const { name, email, password, roles } = req.body;

      const connection = pool.promise();

      // Cek email duplicate
      const sqlGetUser = `SELECT email FROM users WHERE email = ?`;
      const dataGetUser = [email];
      const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

      if (resGetUser.length)
        return res.status(400).send({ message: "Email is already exists" });

      const sqlGetRole = `SELECT role_id FROM roles WHERE roles = ?`;
      const dataGetRole = [roles];
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
      console.log(error?.message);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
  getUser: async (req, res) => {
    try {
      const connection = pool.promise();

      const [sqlGetUser] = await connection.query(
        `select name, email, r.roles from users join roles r using (role_id);`
      );
      res.status(200).send({ message: "Success get users", data: sqlGetUser });
    } catch (error) {
      console.log(error?.message);
      return res.status(500).send({ message: "Internal server error" });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const connection = pool.promise();

      const [sqlGetUser] = await connection.query(
        `select user_id, name, email, roles
        from users u
        join roles e using (role_id)
        where u.user_id = '${id}'`
      );

      if (!sqlGetUser.length)
        return res.status(400).send({ message: "User tidak ditemukan" });

      res
        .status(200)
        .send({ message: "Success get user detail", data: sqlGetUser });
    } catch (error) {
      console.log(error?.message);
      return res.status(500).send({ message: "Internal server error" });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { roles } = req.user;

      if (roles != "admin")
        return res.status(403).send({ message: "Forbidden" });

      const connection = pool.promise();
      const [sqlDeleteUser] = await connection.query(
        `delete from users where user_id = '${id}'`
      );

      if (!sqlDeleteUser.affectedRows)
        return res.status(500).send({ message: "Gagal menghapus user" });

      res.send({ message: "Success delete user" });
    } catch (error) {
      console.log(error?.message);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};
