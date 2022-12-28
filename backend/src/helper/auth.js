const pool = require("../lib/databases");
const { verifyToken } = require("../lib/token");

const auth = async (req, res, next) => {
  try {
    // get token
    const token = req.token;

    if (!token) return res.status(401).send({ message: "unauthorize" });

    const verifiedToken = verifyToken(token);

    const connection = pool.promise();

    const sqlGetUser = `SELECT user_id, name, email FROM user WHERE user_id = ?`;
    const dataGetUser = [verifiedToken.user_id];
    const [resGetUser] = await connection.query(sqlGetUser, dataGetUser);

    if (!resGetUser.length) throw { message: "User not found" };

    req.user = resGetUser[0];
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
