const Report = require("../../models/report");
const User = require("../../models/user");

module.exports = {
  addReport: async (args, req) => {
    const report = new Report({
      address: args.report.address,
      creator: req.cookies.refresh_token,
      date: args.report.date,
      description: args.report.description,
      intensity: args.report.intensity,
      objectId: args.report.objectId,
      status: args.report.status,
      trackingId: args.report.trackingId,
    });
    const result = await report.save();
    const user = await User.findById(report.creator);
    return { ...result._doc, _id: result.id, creator: user };
  },
};
