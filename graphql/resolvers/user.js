const jwt = require("jsonwebtoken-refresh");
const User = require("../../models/user");

module.exports = {
  refreshSession: async (args, req) => {
    const refresh_token = req.refresh_token;
    const user = await User.findById(refresh_token);
    if (!user) {
      throw { error: "invalid refresh_token" };
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "dribletssupersecretkey",
      { expiresIn: "30s" }
    );

    return {
      userId: user._id,
      address: user.address,
      fName: user.fName,
      lName: user.lName,
      token: token,
      tokenExpiration: 1,
      refreshToken: user.id,
    };
  },
  users: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Session Expired");
    }
    try {
      const users = await User.find();
      return users.map((user) => {
        return {
          _id: user._id,
          fName: user.fName,
          lName: user.lName,
          email: user.email,
          address: user.address,
          password: user.password,
        };
      });
    } catch (err) {
      throw err;
    }
  },
};
