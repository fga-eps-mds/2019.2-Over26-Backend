var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const overdraftController = require('../controllers').overdraft;
const overdraftDebtController = require('../controllers').overdraftDebt;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

router.get('/api/overdrafts', overdraftController.list);
router.get('/api/overdrafts/:id', overdraftController.getByPk);
router.post('/api/overdrafts', overdraftController.create);
router.put('/api/overdrafts/:id', overdraftController.activateCredit);
router.put('/api/overdrafts/:id', overdraftController.update);
router.delete('/api/overdrafts/:id', overdraftController.delete);

router.post('/api/users/:id/overdraftDebt/', overdraftDebtController.create);

router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);

module.exports = router;