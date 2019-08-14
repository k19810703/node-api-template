const {
  createLogger,
  format,
  transports,
} = require('winston');

const {
  combine,
  timestamp,
  printf,
} = format;

const myFormat = printf(
  param => `${param.timestamp} ${param.level}: ${param.message}`,
);

const log = createLogger({
  level: 'info',
  format: combine(
    // label({ label: 'node-api-template' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
  ],
});

module.exports.log = log;
