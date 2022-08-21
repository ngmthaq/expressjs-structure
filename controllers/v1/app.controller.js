/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getHomepage = (req, res) => {
  res.json({ hello: "world" });
};

module.exports = {
  getHomepage,
};
