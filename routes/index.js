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
const echoController = require('../controller/echo')

//------------------------------------------
// Rooting
//------------------------------------------
router.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

router.post('/chat', chatController.chat);

// for Debugging
if( process.env.NODE_ENV === 'develop' ){
  router.get('/echo', echoController.get)
  router.post('/echo', echoController.post)
}

//------------------------------------------
// export
//------------------------------------------
module.exports = router
