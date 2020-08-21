const authResolver = require("./auth");
const reports = require("./report");
const users = require("./user");

const rootResolver = {
  ...authResolver,
  ...reports,
  ...users,
};

module.exports = rootResolver;
