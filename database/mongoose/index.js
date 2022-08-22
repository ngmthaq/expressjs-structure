const mongoose = require("mongoose");
const { errorFileLogger } = require("../../libs");

/**
 *
 * @returns {Promise<mongoose.Mongoose>} connection
 */
const createDbConnection = async () => {
  return mongoose.connect(process.env.DB_MONGOOSE_URL);
};

module.exports = {
  createDbConnection,
};
