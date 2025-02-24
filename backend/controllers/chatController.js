const Chat = require("../models/chatModel");
const User = require("../models/userModel"); 

// Save a new message
const saveMessage = async (req, res) => {
    try {
        const { sender, message, room } = req.body;

        if (!sender || !message) {
            return res.status(400).json({ error: "Sender and message are required" });
        }

        // Check if the sender exists
        const user = await User.findById(sender);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newMessage = new Chat({ sender, message, room: room || "global" });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error saving message:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get chat history for a specific room
const getMessages = async (req, res) => {
    try {
        const { room } = req.params;
        const messages = await Chat.find({ room }).populate("sender", "email"); // Populate email instead of username

        res.status(200).json(messages);
    } catch (err) {
        console.error("Error retrieving messages:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { saveMessage, getMessages };
