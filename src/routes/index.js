var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

router.get('/api/account/:id', accountController.getByPk);
router.post('/api/account', accountController.create);
router.put('/api/account/:id', accountController.update);

const overdraftController = require('../controllers').overdraft;

router.get('/api/account/:id', accountController.getByPk);
router.put('/api/account/:id', accountController.update);
router.put('/api/account/:id', accountController.desabilit);

module.exports = router;

module.exports = router;