const authResolver = require("./auth");
const reports = require("./report");
const track = require("./track");
const users = require("./user");

const rootResolver = {
  ...authResolver,
  ...reports,
  ...track,
  ...users,
};

module.exports = rootResolver;
