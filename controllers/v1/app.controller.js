const { mongoose } = require("../../database");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getHomepage = async (req, res) => {
  res.json({ hello: "world" });
};

module.exports = {
  getHomepage,
};
