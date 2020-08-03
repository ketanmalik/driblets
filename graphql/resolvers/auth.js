const bcrypt = require("bcryptjs");

const User = require("../../models/user");

module.exports = {
  createUser: async (args) => {
    try {
      //   const existingUser = await User.findOne({ email: args.userInput.email });
      //   if (existingUser) {
      //     throw new Error("User already exists.");
      //   }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        address: args.userInput.address,
        email: args.userInput.email,
        fName: args.userInput.fName,
        lName: args.userInput.lName,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result._id };
    } catch (err) {
      throw err;
    }
  },
};
