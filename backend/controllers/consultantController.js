const Consultant = require("../models/consultantModel");

// Fetch all consultants
const getAllConsultants = async (req, res) => {
  try {
    const consultants = await Consultant.find();
    res.status(200).json(consultants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching consultants", error });
  }
};

// Add a new consultant (optional, if needed in the future)
const addConsultant = async (req, res) => {
  try {
    const { name, email, designation } = req.body;
    const newConsultant = new Consultant({ name, email, designation });
    await newConsultant.save();
    res.status(201).json(newConsultant);
  } catch (error) {
    res.status(400).json({ message: "Error adding consultant", error });
  }
};

module.exports = { getAllConsultants, addConsultant };
