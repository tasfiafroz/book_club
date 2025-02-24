const mongoose = require('mongoose')

const Schema = mongoose.Schema

const statusSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    replies: [
        {
          text: String,
          createdAt: { type: Date, default: Date.now }
        }
      ]

}, { timestamps: true})

module.exports = mongoose.model('Status', statusSchema)
