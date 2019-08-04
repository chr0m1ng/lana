const router = require('express').Router();


/**
 * @api [post] /messages
 * summary: Send a message to Lana
 * tags: [Messages]
 * parameters: [
 *  {
 *      name: "authorization",
 *      in: header
 *  },
 *  {
 *      name: "body",
 *      in: body,
 *      value: {"from": "user@channel", "type": "text/plain", "content": "message"}
 *  }
 * ]
 */

router.post('/', (req, res) => {
    return res.send('message');
});

module.exports = router;