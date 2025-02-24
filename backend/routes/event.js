const express = require("express");
const Event = require("../models/eventModel");
const requireAuth = require("../middleware/requireAuth"); // Import authentication middleware

const router = express.Router();

// Require authentication for all event routes
router.use(requireAuth);

// Create a new event (only for logged-in users)
router.post("/", async (req, res) => {
  try {
    const { title, description, start, end } = req.body;

    // Validate required fields
    if (!title || !description || !start || !end) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get user ID from request (added by requireAuth middleware)
    const userId = req.user._id;

    // Create a new event linked to the logged-in user
    const event = new Event({ title, description, start, end, userId });
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all events for the logged-in user
router.get("/", async (req, res) => {
  try {
    const userId = req.user._id;
    const events = await Event.find({ userId }); // Fetch only the logged-in user's events
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single event by ID (only if it belongs to the logged-in user)
router.get("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const event = await Event.findOne({ _id: req.params.id, userId });

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an event (only if it belongs to the logged-in user)
router.put("/:id", async (req, res) => {
  try {
    const { title, description, start, end } = req.body;

    if (!title || !description || !start || !end) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = req.user._id;
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, userId }, // Ensure the user owns the event
      { title, description, start, end },
      { new: true } // Return the updated event
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an event (only if it belongs to the logged-in user)
router.delete("/:id", async (req, res) => {
  try {
    const userId = req.user._id;
    const event = await Event.findOneAndDelete({ _id: req.params.id, userId });

    if (!event) {
      return res.status(404).json({ message: "Event not found or unauthorized" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
