const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

  login: async (args) => {
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
      { expiresIn: "1h" }
    );
    return {
      userId: user.id,
      fName: user.fName,
      lName: user.lName,
      token: token,
      tokenExpiration: 1,
    };
  },
};
