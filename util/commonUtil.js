const Boom = require('@hapi/boom');

const { log } = require('./log');

function errorHandler(requestid, error) {
  log.error(`${requestid} errorHandler ${JSON.stringify(error)}`);
  let localError;
  if (!Boom.isBoom(error)) {
    if (error.isJoi) {
      localError = Boom.badRequest(error.details.map(detail => detail.message));
    } else {
      localError = Boom.boomify(error, { statusCode: 400 });
    }
  } else {
    localError = error;
  }
  return {
    responseCode: localError.output.statusCode,
    responseData: {
      requestid,
      errorInfo: localError.output.payload,
    },
  };
}

module.exports.errorHandler = errorHandler;
