const mailgun = require("mailgun-js");

const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendAppointmentEmail = async (req, res) => {
  const { consultantEmail, consultantName, name, contact, email, problem, appointmentDate } = req.body;

  if (!consultantEmail || !name || !email || !problem || !appointmentDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: consultantEmail,
    subject: `New Appointment Request from ${name}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Consultant:</strong> ${consultantName}</p>
      <p><strong>Client Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Problem Description:</strong> ${problem}</p>
      <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
      <br>
      <p>Please respond to the client to confirm the appointment.</p>
    `,
  };

  mg.messages().send(emailData, (error, body) => {
    if (error) {
      console.error("Mailgun error:", error);
      return res.status(500).json({ message: "Failed to send email" });
    }
    res.status(200).json({ message: "Email sent successfully!", body });
  });
};

module.exports = { sendAppointmentEmail };
