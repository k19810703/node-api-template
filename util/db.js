const mongoose = require('mongoose');
// const { log } = require('console');

function connect() {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

module.exports.connectMongo = connect;
