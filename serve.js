/**
 * ChatGPT Proxy
 *
 * usage)
 *   node serve.js
 */

//------------------------------------------
// Module
//------------------------------------------
const path = require('path')
const cluster = require('cluster')
const os = require('os')
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const app  = express()

// Router setting
const router = require('./routes');

//------------------------------------------
// Constant
//------------------------------------------
const ENV = process.env.NODE_ENV || 'develop'

//------------------------------------------
// Load .env
//------------------------------------------
dotenv.config({
  override: true
})

//------------------------------------------
// Cluster
//------------------------------------------
const numCPUs = os.cpus().length

//------------------------
// Parent process
//------------------------
if( cluster.isMaster ) {
  const workernum = (ENV === 'develop')?  1: numCPUs * 2
  for(let i=0; i<workernum; i++) {
    console.log(`Master : Cluster Fork ${i}`);
    cluster.fork();
  }
  // Krush Worker
  cluster.on('exit', (worker, code, signal) => {
    console.warn(`[${worker.id}] Worker died : [PID ${worker.process.pid}] [Signal ${signal}] [Code ${code}]`);
    cluster.fork();
  });
}
//------------------------
// Child process
//------------------------
else{
  console.log(`[${cluster.worker.id}] [PID ${cluster.worker.process.pid}] Worker Start`);

  // Middleware
  app.use(cors())   // CORS
  app.use(express.urlencoded({extended: true}))   // POST

  // Request Log
  app.use((req, res, next)=>{
    console.log(`[${cluster.worker.id}] [PID ${cluster.worker.process.pid}] Request ${req.method} ${req.url}`);
    next()
  })

  //------------------------------------------
  // Routing
  //------------------------------------------
  app.use(router);

  // 404
  app.use((req, res, next) => {
    if( !('result' in res.locals) ){
      res.locals.result = {status: 404, data: {'message':'Not Found'}}
    }
    next()
  });

  // response
  app.use((req, res, next)=>{
    const result = res.locals.result

    res
      .status(result.status)
      .set('Connection', 'close')
      .json(result.data)

    next();
  })

  //------------------------------------------
  // Start Server
  //------------------------------------------
  if(ENV === 'production'){
    app.enable('trust proxy');
  }

  // disable some header
  app.disable('etag')           // ETag
  app.disable('x-powered-by')   // X-Powered-By

  // wake up server
  app.listen(process.env.HTTP_PORT, () => {
    console.log(`[${cluster.worker.id}] listening at http://localhost:${process.env.HTTP_PORT}`);
  })
}