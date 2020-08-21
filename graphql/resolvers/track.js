const Report = require("../../models/report");
const User = require("../../models/user");

module.exports = {
  track: async (args) => {
    const report = await Report.findOne({ trackingId: args.trackingId });
    if (!report) {
      throw new Error("report not found");
    }
    const user = await User.findById(report.creator);
    return { ...report._doc, creator: user };
  },
};
