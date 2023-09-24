/**
 * Response Data
 */

//----------------------------------------------------------
// constants
//----------------------------------------------------------
const namespace = 'result';

//----------------------------------------------------------
// global variables
//----------------------------------------------------------
const DATA = {}

/**
 * Set Success response data
 *
 * @param {object} data {message: 'Hello World!'}
 * @param {number} [code=200]
 */
function success(data, code=200){
  set('status', code);
  set('data', data);
}

/**
 * Set Error response data (Server)
 *
 * @param {object} data {message: 'Internal Server Error'}
 * @param {number} [code=500]
 */
function errorSerer(data, code=500){
  set('status', code);
  set('data', data);
}

/**
 * Set Error response data (Client)
 *
 * @param {object} data {message: 'Bad Request'}
 * @param {number} [code=400]
 */
function errorClient(data, code=400){
  set('status', code);
  set('data', data);
}

/**
 * set response data
 *
 * @param {string} key
 * @param {any} value
 * @param {string} [ns=null]
 * @returns {void}
 */
function set(key, value, ns=null){
  ns = ns || namespace;

  if( (ns in DATA) === false ){
    DATA[ns] = {};
  }

  DATA[ns][key] = value;
}

/**
 * get response data
 *
 * @param {string} key
 * @param {string} [ns=null]
 * @returns {any}
 */
function get(key, ns=null){
  ns = ns || namespace;
  if( (ns in DATA) === false ||
      (key in DATA[ns]) === false ){
    return null;
  }

  return DATA[ns][key];
}

/**
 * check response data exists
 *
 * @param {string} key
 * @param {string} [ns=null]
 * @returns {boolean}
 */
function exists(key, ns=null){
  ns = ns || namespace;
  if( (ns in DATA) === false ||
      (key in DATA[ns]) === false ){
    return false;
  }

  return true;
}

/**
 * remove response data
 *
 * @param {string} key
 * @param {string} [ns=null]
 * @returns {false|void}
 */
function remove(key, ns=null){
  ns = ns || namespace;
  if( (ns in DATA) === false ||
      (key in DATA[ns]) === false ){
    return false;
  }

  delete DATA[ns][key];
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = {
  set,
  get,
  exists,
  remove,
  success,
  errorSerer,
  errorClient
}