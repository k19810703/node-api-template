const { Animal } = require('./Models');
const { connectMongo } = require('../util/db');
const { log } = require('../util/log');

async function getAll() {
  log.info('getAll');
  await connectMongo();
  const datas = await Animal.find({});
  return datas;
}

async function create(data) {
  await connectMongo();
  const newanimal = new Animal(data);
  log.info(newanimal);
  await newanimal.save();
  return newanimal;
}

module.exports.getAll = getAll;
module.exports.create = create;
