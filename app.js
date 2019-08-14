const express = require('express');
const swaggerUi = require('swagger-ui-express');
const Boom = require('@hapi/boom');
const morgan = require('morgan');
const moment = require('moment');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const addRequestId = require('express-request-id')();

const { log } = require('./util/log');
const { errorHandler } = require('./util/commonUtil');
const business = require('./biz/bizRoute');
const constdata = require('./util/constdata.js');

app.use(addRequestId);
app.use(morgan(':date[iso] info: :res[X-Request-Id] :method :url :status :res[content-length] - :response-time ms'));
// 配置跨域请ld求
app.use(cors());
// ADD USE START
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 加载swagger
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 请求预处理，在响应头上加上RequestId字段，方便排查
app.use((req, res, next) => {
  log.info(`${req.id} ${req.method} ${req.originalUrl}`);
  next();
});
// app.use('/', index);
// app.use('/api/healthcheck', healthcheck);
// app.use('/api/order', order);
app.use('/api/biz', business);
// app.use('/api/pagedata', pagedata);

// catch error


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(Boom.notFound(`${req.originalUrl} not found`));
});

// error handler
app.use((err, req, res, next) => {
  const {
    responseCode,
    responseData,
  } = errorHandler(req.id, err);
  res.status(responseCode).send(responseData);
  next();
});

module.exports = app;
