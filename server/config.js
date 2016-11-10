const ConfConf = require('conf_conf');

module.exports = ConfConf.configure(process.env, function (conf) {
  conf.config('enableTunnel', { default: false });

  conf.config('logFormat', {
    default: process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
  });

  conf.config('nodeEnv', { default: 'development' });

  conf.config('port', { default: 3100 });
});
