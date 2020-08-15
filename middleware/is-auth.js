const jwt = require("jsonwebtoken-refresh");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  let refresh_token = null;
  if (req.cookies && req.cookies.refresh_token) {
    refresh_token = req.cookies.refresh_token;
  }
  req.refresh_token = refresh_token;

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token || token == "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "dribletssupersecretkey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
