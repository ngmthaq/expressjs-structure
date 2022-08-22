const { mysql } = require("../../database");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const getUser = async (req, res, next) => {
  try {
    const conn = await mysql.createDbConnection();
    const [responseData] = await conn.query("select * from authors");
    res.json({ data: responseData });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
};
