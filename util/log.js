const {createLogger, format, transports} = require("winston");
const { combine, timestamp, label, prettyPrint } = format;

const log = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        // format.prettyPrint(),

    ),
    // defaultMeta: { service: 'node-api-template' },
    transports: [
        new transports.Console(),
    ]
  });

module.exports.log = log;
