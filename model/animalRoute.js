const express = require('express');

const { getAll, create } = require('./animalProcess');

const router = express.Router();


router.get('/', async (req, res, next) => {
  getAll()
    .then(data => res.json(data))
    .catch(error => next(error));
});

router.post('/', (req, res, next) => {
  create(req.body)
    .then(data => res.json(data))
    .catch(error => next(error));
});

module.exports = router;
