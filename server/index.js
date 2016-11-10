/* eslint consistent-return:0 */

const config = require('./config');

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = config.nodeEnv !== 'production';
const ngrok = (isDev && config.enableTunnel) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

const morgan = require('morgan');
app.use(morgan(config.logFormat));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

const port = argv.port || config.port;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
