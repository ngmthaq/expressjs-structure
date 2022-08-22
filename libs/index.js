/**
 *
 * @param {*} error
 */
const errorFileLogger = (error) => {
  let path = require("path");
  let fs = require("fs");
  let today = new Date().setUTCHours(0, 0, 0, 0);
  let now = Date.now();
  let logDir = path.resolve(__dirname, "../bin/logs", `error-log-${today}.md`);
  let content = `[${now}]: ${error?.stack || ""}}\r\n\r\n`;

  console.error(`Error logger: ${content}`);
  fs.writeFile(logDir, content, { flag: "a" }, (err) => {
    if (err) {
      console.error("Error at fs.writeFile: ", err);
    }
  });
};

/**
 * Error handling middleware function for logging the error message
 * @param {*} error
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const errorLogger = (error, request, response, next) => {
  errorFileLogger(error);
  next(error); /* calling next middleware */
};

/**
 * Error handling middleware function reads the error message and sends back a response in JSON format
 * @param {*} error
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const errorResponder = async (error, request, response, next) => {
  let status = error.status || 500;
  let json = { error: error.message };
  if (process.env.APP_ENVIROMENT === "develop") {
    json = { ...json, stack: error.stack };
  }

  response.header("Content-Type", "application/json");
  response.status(status).json(json);
};

/**
 * Fallback middleware function for returning 404 error for undefined paths
 * @param {*} request
 * @param {*} response
 * @param {*} next
 */
const invalidPathHandler = (request, response, next) => {
  response.status(404).json({ error: "Not found" });
};

/**
 * Application listener
 * @param {Number} port
 */
const appListener = (port) => {
  console.clear();
  console.log("========================================================");
  console.log(`| >>>> Server listening on port ${port}`);
  if (process.env.APP_ENVIROMENT === "develop") {
    console.log(`| >>>> Development server host http://localhost:${port}`);
  }
  console.log("========================================================");
};

/**
 * Autoloading application routes with version format "/api/version/route"
 * @param {import("express").Express} server
 */
const routerAutoloader = (server) => {
  const routers = require("../routers");

  for (const version in routers) {
    if (Object.hasOwnProperty.call(routers, version)) {
      const router = routers[version];
      for (const route in router) {
        if (Object.hasOwnProperty.call(router, route)) {
          const routeFunc = router[route];
          if (route === "app") {
            server.use(`/api/${version}`, routeFunc);
          } else {
            server.use(`/api/${version}/${route}`, routeFunc);
          }
        }
      }
    }
  }
};

module.exports = {
  errorLogger,
  errorResponder,
  invalidPathHandler,
  appListener,
  routerAutoloader,
  errorFileLogger,
};
