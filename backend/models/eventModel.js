const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // ✅ Link to user
});

module.exports = mongoose.model("Event", eventSchema);
