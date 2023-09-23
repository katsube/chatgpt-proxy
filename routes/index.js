/**
 * Router setting
 *
 */

//------------------------------------------
// Module
//------------------------------------------
const express = require('express')
const router  = express.Router()

// Controller
const chatController = require('../controller/chat')

//------------------------------------------
// Rooting
//------------------------------------------
router.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

router.post('/chat', chatController.chat);

//------------------------------------------
// export
//------------------------------------------
module.exports = router
