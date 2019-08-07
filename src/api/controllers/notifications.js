const router = require('express').Router();

/**
 * @api [post] /notifications
 * summary: Send a notification to Lana
 * tags: [Notifications]
 * parameters: [
 *  {
 *      name: "authorization",
 *      in: header
 *  },
 *  {
 *      name: "body",
 *      in: body,
 *      value: {"to": "user@channel", "type": "text/plain", "content": "message"}
 *  }
 * ]
 */
router.post('/', (req, res) => {
    return res.send('notifications');
});

module.exports = router;
