const Stats = require('../models/statusModel')
const mongoose = require('mongoose')

// Get all statuses
const getStats = async (req, res) => {
    const stats = await Stats.find({}).sort({ createdAt: -1 })
    res.status(200).json(stats)
}

// Get a single status
const getStat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such value" })
    }

    const stat = await Stats.findById(id)
    if (!stat) {
        return res.status(404).json({ error: "No such value" })
    }

    res.status(200).json(stat)
}

// Create new status
const createStat = async (req, res) => {
    const { name, description } = req.body

    if (!name || !description) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
        const stat = await Stats.create({ name, description })
        res.status(200).json(stat)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// Delete a status
const deleteStat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such value" })
    }

    const stat = await Stats.findOneAndDelete({ _id: id })
    if (!stat) {
        return res.status(404).json({ error: "No such value" })
    }

    res.status(200).json(stat)
}

// Update a status
const updateStat = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such value" })
    }

    const stat = await Stats.findOneAndUpdate({ _id: id }, req.body, { new: true })
    if (!stat) {
        return res.status(404).json({ error: "No such value" })
    }

    res.status(200).json(stat)
}

const addReply = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such status" });
    }

    try {
        const status = await Stats.findById(id);
        if (!status) {
            console.log("Status not found");  // Debugging log
            return res.status(404).json({ error: "Status not found" });
        }

        status.replies.push({ text });
        await status.save();

        res.status(201).json(status); // Return the updated status object
    } catch (error) {
        console.error(error); // Log the actual error
        res.status(400).json({ error: "Failed to add reply" });
    }
};

module.exports = {
    getStats,
    getStat,
    createStat,
    deleteStat,
    updateStat,
    addReply
}
