process.env.APP_ENV = 'DEV';
process.env.NODE_ENV = 'NOT production';

require('babel-register');
require('./app/setupGlobalVariables.js');
require('./app/server.js');
require('./build/runDevServer.js');
