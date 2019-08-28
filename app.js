const express = require('express');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const Boom = require('@hapi/boom');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const addRequestId = require('express-request-id')();

const { log } = require('./util/log');
const { errorHandler } = require('./util/commonUtil');
// TODO:此处业务路由
const animailRoute = require('./model/animalRoute');

app.use(addRequestId);
// 添加security header
app.use(helmet());
app.use(morgan(':date[iso] info: :res[X-Request-Id] :method :url :status :res[content-length] - :response-time ms'));
// 配置跨域请ld求
app.use(cors());
// ADD USE START
app.use(bodyParser.json({ limit: '300kb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// 加载swagger
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// 请求预处理，在响应头上加上RequestId字段，方便排查
app.use((req, res, next) => {
  log.info(`${req.id} ${req.method} ${req.originalUrl}`);
  next();
});

// TODO:此处添加业务路由
app.use('/api/animal', animailRoute);

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
