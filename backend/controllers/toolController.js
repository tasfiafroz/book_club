const Tool = require('../models/toolModel')
const mongoose = require('mongoose')

//get all tool
const getTools = async (req, res) => {
    const tools = await Tool.find({}).sort({createdAt: -1})

    res.status(200).json(tools)
}


//get a single tool
const getTool = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such value"})
    }

    const tool = await Tool.findById(id)
    
    if (!tool) {
        return res.status(404).json({error: 'No such value'})
    }

    res.status(200).json(tool)
}


//create new tool
const createTool = async (req, res) => {
    const {title, load, reps} = req.body

    //add doc to db
    try{
        const tool = await Tool.create({title, load, reps})
        res.status(200).json(tool)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a tool
const deleteTool = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such value"})
    }

    const tool = await Tool.findOneAndDelete({_id: id})

    if (!tool) {
        return res.status(404).json({error: 'No such value'})
    }
    
    res.status(200).json(tool)
}

//update a tool
const updateTool = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such value"})
    }

    const tool = await Tool.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!tool) {
        return res.status(400).json({error: 'no such value'})
    }

    res.status(200).json(tool)
}

module.exports = {
    getTools,
    getTool,
    createTool,
    deleteTool,
    updateTool
}