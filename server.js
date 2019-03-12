const app = require('./app');
const { log } = require('./util/log');

const port = process.env.PORT || '3000';

app.listen(port, () => {
  log.info(`server starting on http://localhost:${port}`);
});
