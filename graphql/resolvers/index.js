const authResolver = require("./auth");
const users = require("./user");

const rootResolver = {
  ...authResolver,
  ...users,
};

module.exports = rootResolver;
