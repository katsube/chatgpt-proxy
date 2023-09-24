/**
 * Chat Controller
 *
 */

//------------------------------------------------------
// Modules
//------------------------------------------------------
const responseData = require('../lib/responseData')
const chatgpt = require('../lib/chatgpt')

exports.chat = async (req, res, next) => {
  const message = req.body.message

  try{
    const json = await chatgpt.request(message)
    responseData.success(json)
  }
  catch(e){
    console.log(e.message)
    responseData.errorServer({message: 'Internal Server Error'})
  }

  next();
}