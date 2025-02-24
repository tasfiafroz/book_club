const express = require("express");
const { sendAppointmentEmail } = require("../controllers/appointmentController");

const router = express.Router();
router.post("/send-email", sendAppointmentEmail);

module.exports = router;
