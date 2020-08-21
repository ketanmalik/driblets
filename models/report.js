const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reportSchema = Schema({
  address: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: String, required: true },
  description: { type: String, required: false },
  intensity: { type: String, required: true },
  objectId: { type: String, required: true },
  status: { type: String, required: true },
  trackingId: { type: String, required: true },
});

module.exports = mongoose.model("Report", reportSchema);
