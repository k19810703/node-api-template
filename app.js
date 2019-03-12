//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const uuidv1 = require('uuid/v1');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
// create a new express server
const app = express();

// ADD START
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
// const Db2Store = require('connect-db2')(session);
const cors = require('cors');
// const monitor = require('express-status-monitor')();

// const Database = require('./util/db2class');
const { log } = require('./util/log');
const index = require('./routes/index');
const healthcheck = require('./routes/healthcheck');
// const order = require('./routes/order');
const business = require('./COMPONENT/PROCESS/businessRoute');
const pagedata = require('./COMPONENT/PageData/pageDataRoute');

const swaggerDocument = require('./swagger.json');
const UnauthError = require('./COMPONENT/Error/UnauthError.js');
const NotFound = require('./COMPONENT/Error/NotFound.js');
const BadRequest = require('./COMPONENT/Error/BadRequest.js');
const DatabaseError = require('./COMPONENT/Error/DatabaseError.js');
const SystemError = require('./COMPONENT/Error/SystemError.js');
const constdata = require('./util/constdata.js');

// const dbstore = new Database();
// const sessionStore = new Db2Store({}, dbstore.db2conn);
// sessionStore.hasDatabaseTable((error1, hasTable) => {
//   if (error1) {
//     log.error(error1);
//     return;
//   }
//   if (hasTable === false) {
//     sessionStore.createDatabaseTable((error) => {
//       log.error(error);
//     });
//   }
// });

// ADD END
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.use(express.static(`${__dirname}/public`));


app.use(cors());
// ADD USE START
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  // store: sessionStore,
  secret: 'amlbatch',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 },
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(monitor);
app.use((req, res, next) => {
  const uuid = uuidv1();
  log.info(req.session.userinfo || `request from api (${uuid})`, req.method, req.originalUrl, req.body);
  res.append(constdata.uuidfieldname, uuid);
  if (!req.session.userinfo) {
    if (req.originalUrl.startsWith('/api')) {
      if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        log.info(`${process.env.NODE_ENV} env skip check apitoken `);
        next();
      } else {
        log.info(`check apitoken ${req.headers.apitoken}`);

        if (!req.headers.apitoken) {
          log.info('no apitoken in header');
          next(new UnauthError());
        } else if (req.headers.apitoken === process.env.APIToken) {
          next();
        } else {
          next(new UnauthError());
        }
      }
    } else if (req.originalUrl === '/user/login' || req.originalUrl === '/login') {
      next();
    } else {
      log.info('no user info , redirect to /login');
      next();
      // res.redirect('/login');
    }
  } else {
    log.info(`user info: ${req.session.userinfo}`);
    next();
  }
});
app.use('/', index);
app.use('/api/healthcheck', healthcheck);
// app.use('/api/order', order);
app.use('/api/business', business);
app.use('/api/pagedata', pagedata);

// catch error


// catch 404 and forward to error handler
app.use((req, res, next) => {
  log.info('not found');
  next(new NotFound(req.originalUrl));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  log.error('error handler:', err);
  let localerr = err;
  log.info('error request info',
    // req.session.userinfo || 'request from api',
    req.method,
    req.originalUrl,
    req.body);
  // 形式チェックエラー
  if (err.isJoi) {
    localerr = new BadRequest(err.details.map(detail => detail.message));
  } else if (err.sqlcode) {
    localerr = new DatabaseError(err.message);
  } else if (err.code) {
    localerr = err;
  } else {
    localerr = new SystemError(err.message);
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
