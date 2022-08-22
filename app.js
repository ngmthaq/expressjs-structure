/**
 *
 * @param {Number} port
 */
const app = (port) => {
  const express = require("express");
  const cors = require("cors");
  const cookieParser = require("cookie-parser");
  const server = express();
  const libs = require("./libs");

  // Server configuaration
  server.use(cors());
  server.use(cookieParser());
  server.use("/img", express.static("public/img"));
  server.use("/vid", express.static("public/vid"));

  // Router configuation
  libs.routerAutoloader(server);

  // Error handler
  server.use(libs.errorLogger);
  server.use(libs.errorResponder);
  server.use(libs.invalidPathHandler);

  // Server listener
  server.listen(port, () => libs.appListener(port));
};

module.exports = app;
