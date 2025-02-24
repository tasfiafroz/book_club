const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // References User model
        required: true
    },
    message: {
        type: String,
        required: true
    },
    room: {
        type: String, // Room name or ID for group chats
        default: "global"
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Chat", chatSchema);
