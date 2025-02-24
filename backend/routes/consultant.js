const express = require("express");
const { getAllConsultants, addConsultant } = require("../controllers/consultantController");

const router = express.Router();

router.get("/", getAllConsultants); // Fetch all consultants
router.post("/", addConsultant); // Add a consultant (optional)

module.exports = router;
