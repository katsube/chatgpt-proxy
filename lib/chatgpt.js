/**
 * ChatGPT Library
 */

//------------------------------------------------------
// Environment Variables
//------------------------------------------------------
const API_ENDPOINT = process.env.API_ENDPOINT
const API_MODEL    = process.env.API_MODEL
const API_KEY      = process.env.API_KEY

/**
 * Request ChatGPT
 *
 * @param {array} message [{"role":"user", "content":"自己紹介をして下さい"}]
 * @return {object} JSON
 * @throws {Error} error object
 */
async function request(message){
  try{
    talk = JSON.parse(message)
  }
  catch(e){
    throw new Error('Bad JSON format')
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: API_MODEL,
      messages: talk
    })
  };
  console.log('request', options)

  try{
    const response = await fetch(API_ENDPOINT, options)
    const json = await response.json()
    return json
  }
  catch(e){
    throw new Error(e.message)
  }
}

//------------------------------------------------------
// exports
//------------------------------------------------------
module.exports = {
  request
}