const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
});

const Consultant = mongoose.model("Consultant", consultantSchema);

module.exports = Consultant;
