var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;
const userController = require('../controllers').user;
const overdraftController = require('../controllers').overdraft;
const overdraftDebtController = require('../controllers').overdraftDebt;
const transactionController = require('../controllers').transaction;

/* GET Home */ 
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
}); 

/* Overdraft Router */
router.get('/api/overdrafts', overdraftController.list);
router.get('/api//users/:id/overdrafts', overdraftController.getByPk);
router.post('/api/users/:id/overdrafts', overdraftController.create);
router.put('/api/users/:id/overdrafts', overdraftController.activateCredit);
router.put('/api/users/:id/overdrafts', overdraftController.update);
router.delete('/api/users/:id/overdrafts', overdraftController.delete);

/* Account Router */
router.get('/api/accounts/:id', accountController.getByPk);
router.post('/api/accounts', accountController.create);
router.put('/api/accounts/:id', accountController.update);

/* User Router */
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);

/* OverdraftDebt Router */
router.post('/api/users/:id/overdraftDebt',overdraftDebtController.create);

/* Transaction Router */
router.get('/api/transactions', transactionController.list);
router.post('/api/accounts/:id/transactions/', transactionController.cashIn);
router.get('/api/transactions/:id', transactionController.getByPk);


module.exports = router;