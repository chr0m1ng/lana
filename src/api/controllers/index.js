const router = require('express').Router();

router.get('/', require('./root'));
router.use('/messages', require('./messages'));
router.use('/notifications', require('./notifications'));

module.exports = router;