const express = require('express')
const {
    getStats,
    getStat,
    createStat,
    deleteStat,
    updateStat,
    addReply
} = require('../controllers/statusController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all tool route
//router.use(requireAuth)

//get all tools
router.get('/', getStats)

//get a single tools
router.get('/:id', getStat)

//POST a new tool
router.post('/', createStat)

//DELETE a new tool
router.delete('/:id', deleteStat)

//UPDATE a new tool
router.patch('/:id', updateStat)

router.post('/:id/reply', addReply)

module.exports = router