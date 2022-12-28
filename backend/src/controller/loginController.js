const { compare } = require("../lib/bcrypt");
const { createToken } = require("../lib/token");
const pool = require("../lib/databases");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const connection = pool.promise();

      const [sqlGetUser] = await connection.query(
        `select user_id, name, email, password, roles from users u join roles r using(role_id) where u.email = '${email}'`
      );

      if (!sqlGetUser.length)
        return res.status(401).send({ message: "Email atau Password salah" });

      const user = sqlGetUser[0];
      const isPasswordMatch = compare(password, user.password);

      if (!isPasswordMatch)
        return res.status(401).send({ message: "Email atau Password salah" });

      const token = createToken({
        user_id: user.user_id,
        user: user.username,
      });

      res.send({
        message: "Login Success",
        data: {
          user_id: user.user_id,
          name: user.name,
          roles: user.roles,
          accessToken: token,
        },
      });
    } catch (error) {
      res.send(error);
    }
  },
};
