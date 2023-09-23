/**
 * Chat Controller
 *
 */

//------------------------------------------------------
// Environment Variables
//------------------------------------------------------
const API_ENDPOINT = process.env.API_ENDPOINT
const API_MODEL    = process.env.API_MODEL
const API_KEY      = process.env.API_KEY

exports.chat = async (req, res, next) => {

  //------------------------------
  // validation
  //------------------------------
  if( ! req.body.message ){
    res.locals.result = {status: 400, data: { message: 'Bad Request (empty message)' }}
    next();
    return;
  }

  let message;
  try{
    message = JSON.parse(req.body.message)
  }
  catch(e){
    res.locals.result = {status: 400, data: { message: 'Bad Request (JSON format error)' }}
    next();
    return;
  }

  //------------------------------
  // set options
  //------------------------------
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      'model': API_MODEL,
      'messages': message
    })
  };

  //------------------------------
  // request chatgpt
  //------------------------------
  try{
    const response = await fetch(API_ENDPOINT, options)
    const json = await response.json()
    res.locals.result = {status: 200, data: json}
  }
  catch(e){
    res.locals.result = {
      status: 500,
      data: { message: `Internal Server Error (${e.message})` }
    }
  }

  next();
}