const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken-refresh");
const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error("User already exists.");
      }
      const user = new User({
        address: args.userInput.address,
        email: args.userInput.email,
        fName: args.userInput.fName,
        lName: args.userInput.lName,
        password: args.userInput.password,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result._id };
    } catch (err) {
      throw err;
    }
  },

  logout: async (args, { res }) => {
    console.log("trying to log out !!!!!!!");
    res.cookie("refresh_token", null, { httpOnly: true });
    return "Logout Successful";
  },

  login: async (args, { res }) => {
    const { email, password } = args;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("user not found");
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("wrong password");
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "dribletssupersecretkey",
      { expiresIn: "30s" }
    );

    res.cookie("refresh_token", user.id, { httpOnly: true });

    return {
      userId: user.id,
      address: user.address,
      fName: user.fName,
      lName: user.lName,
      token: token,
      tokenExpiration: 1,
      refreshToken: user.id,
    };
  },
};
