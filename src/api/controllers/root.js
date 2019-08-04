const router = require('express').Router();

router.get('/', (req, res) => {
  return res.json({
    routes: ['/messages', '/notifications']
  });
});

module.exports = router;