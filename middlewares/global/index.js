const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

const htmlParser = bodyParser.text({ type: "text/html" });

module.exports = {
  jsonParser,
  urlencodedParser,
  htmlParser,
};
