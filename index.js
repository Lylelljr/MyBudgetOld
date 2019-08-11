'use strict';

require('dotenv').config();

const http = require('http');

const app = require('./app.js');

const port = parseInt(process.env.PORT) || 1337;

app.set('port', port);

const server = http.createServer(app);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  const listenErrorHandlers = {
    EACCES: (error) => {
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    },
    EADDRINUSE: (error) => {
      console.error(`${bind} is already in use`);
      process.exit(1);
    },
    default: (error) => {
      throw error;
    }
  };
  (listenErrorHandlers[error.code] || listenErrorHandlers['default'])();
}

function onListening() {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + address.port;
  console.log('---------------------------------------------------------------------------------');
  console.log(`${new Date().toISOString()} | Server running, listening on ${bind}`);
  console.log('---------------------------------------------------------------------------------');
}
