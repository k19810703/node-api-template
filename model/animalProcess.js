const { Animal } = require('./Models');
const { connectMongo } = require('../util/db');
const { log } = require('../util/log');

// TODO:其他业务模型的业务处理在此处添加

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
