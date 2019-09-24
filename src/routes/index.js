var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;
const userController = require('../controllers').user;
const overdraftController = require('../controllers').overdraft;
/* GET users listing. */

/* GET Home */
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

router.get('/api/overdrafts', overdraftController.list);
router.get('/api/overdrafts/:id', overdraftController.getByPk);
router.post('/api/overdrafts', overdraftController.create);
router.put('/api/overdrafts/:id', overdraftController.activateCredit);
router.put('/api/overdrafts/:id', overdraftController.update);
router.delete('/api/overdrafts/:id', overdraftController.delete);

/* Account Router */
router.get('/api/accounts/:id', accountController.getByPk);
router.post('/api/accounts', accountController.create);
router.put('/api/accounts/:id', accountController.update);

/* User Router */
router.get('/api/users', userController.list);
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);

module.exports = router;