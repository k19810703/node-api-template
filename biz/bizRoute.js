const express = require('express');

const router = express.Router();

router.get('/healthcheck', (req, res) => {
  res.json({
    message: 'I am fine',
  });
});

module.exports = router;
