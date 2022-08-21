const express = require("express");
const { getUser } = require("../../controllers/v1/user.controller");
const router = express.Router();

router.get("/", getUser);

module.exports = router;
