const Promise = require('bluebird');
const mongoose = Promise.promisifyAll(require('mongoose'));

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});
const Animal = mongoose.model('Animal', animalSchema);

module.exports.Animal = Animal;
