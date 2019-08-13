const express = require('express');
const swaggerUi = require('swagger-ui-express');
const uuidv1 = require('uuid/v1');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const addRequestId = require('express-request-id')();

const { log } = require('./util/log');
const business = require('./biz/bizRoute');
const constdata = require('./util/constdata.js');
const { NotFoundError } = require('./UserDefineError/notFoundError');


app.use(addRequestId);
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
  log.info(`${req.id} ${req.method} ${req.originalUrl}`, req.body);
  res.append(constdata.uuidfieldname, uuid);
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
  next(new NotFoundError(req));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  log.error('error handler:', err);
  let localerr = err;
  if (err.isJoi) {
    // localerr = new BadRequest(err.details.map(detail => detail.message));
  } else if (err.sqlcode) {
    // localerr = new DatabaseError(err.message);
  } else if (err.operational) {
    localerr = err;
  } else {
    // localerr = new SystemError(err.message);
  }
  const httpstatus = localerr.code || 500;
  // res.locals.message = localerr.message;
  // res.locals.error = req.app.get('env') === 'development' ? localerr : {};
  // render the error page
  localerr[constdata.uuidfieldname] = res.get(constdata.uuidfieldname);
  // console.log('headers', res.get(constdata.uuidfieldname));
  res.status(httpstatus).send(localerr);
  next();
});

module.exports = app;
