const mysql = require("mysql2/promise");
const { errorFileLogger } = require("../../libs");

/**
 *
 * @returns {Promise<import("mysql2").Connection>} connection
 */
const createDbConnection = async (next) => {
  const connection = await mysql.createConnection({
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    user: process.env.DB_MYSQL_USERNAME,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DBNAME,
  });

  return connection;
};

module.exports = {
  createDbConnection,
};
