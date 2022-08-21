const express = require("express");
const { getHomepage } = require("../../controllers/v1/app.controller");
const router = express.Router();

router.get("/", getHomepage);

module.exports = router;
