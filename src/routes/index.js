var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

router.get('/api/accounts/:id', accountController.getByPk);
router.post('/api/accounts', accountController.create);
router.put('/api/accounts/:id', accountController.update);

module.exports = router;