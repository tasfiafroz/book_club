const express = require("express");
const { saveMessage, getMessages } = require("../controllers/chatController");

const router = express.Router();

// Route to send/save a chat message
router.post("/", saveMessage); // Changed from "/send" to "/"

// Route to get chat messages for a specific room
router.get("/messages/:room", getMessages);

module.exports = router;