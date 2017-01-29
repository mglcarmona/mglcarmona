const client = require('./webpack/webpack.config.client.js');
const server = require('./webpack/webpack.config.server.js');

module.exports = [
  client,
  server,
];
