var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;
const userController = require('../controllers').user;

/* GET status*/
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

// Account requests
router.get('/api/accounts/:id', accountController.getByPk);
router.post('/api/accounts', accountController.create);
router.put('/api/accounts/:id', accountController.update);

// User requests
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);

module.exports = router;