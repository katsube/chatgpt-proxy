/**
 * Echo controller
 *
 * ** for Debugging controller **
 */

//------------------------------------------------------
// Modules
//------------------------------------------------------
const responseData = require('../lib/responseData')

/**
 * GET
 *
 */
function get(req, res, next){
  const message = req.query.message
  responseData.success({message: message})
  next();
}

/**
 * POST
 *
 */
function post (req, res, next) {
  const message = req.body.message
  responseData.success({message: message})
  next();
}

//------------------------------------------------------
// export
//------------------------------------------------------
module.exports = {
  get,
  post
}