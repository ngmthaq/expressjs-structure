/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const getUser = (req, res) => {
  res.json({ user: "Ey zo whasup" });
};

module.exports = {
  getUser,
};
