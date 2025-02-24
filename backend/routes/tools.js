const express = require('express')
const {
    createTool,
    getTools,
    getTool,
    updateTool,
    deleteTool
} = require('../controllers/toolController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all tool route
//router.use(requireAuth)

//get all tools
router.get('/', getTools)

//get a single tools
router.get('/:id', getTool)

//POST a new tool
router.post('/', createTool)

//DELETE a new tool
router.delete('/:id', deleteTool)

//UPDATE a new tool
router.patch('/:id', updateTool)


module.exports = router