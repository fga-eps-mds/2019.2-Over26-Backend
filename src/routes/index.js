var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;
const userController = require('../controllers').user;
const overdraftController = require('../controllers').overdraft;
const overdraftDebtController = require('../controllers').overdraftDebt;
const transactionController = require('../controllers').transaction;
const instalmentController = require('../controllers').instalment;

/* GET Home */
router.get('/', function (req, res, next) {
    res.send('respond witsh a resource');
});

router.get("/transaction", function (req, res) {
    res.sendFile("/app/src/views/index.html");
});

/* Overdraft Router */
router.get('/api/overdrafts', overdraftController.list);
router.get('/api//users/:id/overdrafts', overdraftController.getByPk);
router.post('/api/users/:id/overdrafts', overdraftController.create);
//router.put('/api/users/:id/overdrafts', overdraftController.activateCredit);
router.put('/api/users/:id/overdrafts', overdraftController.update);
router.delete('/api/users/:id/overdrafts', overdraftController.delete);
router.get('/api/users/:cpf/overdrafts/usability', overdraftController.checkUsability)

/* Account Router */
router.get('/api/accounts/:accountNumber', accountController.getByPk);
router.post('/api/accounts', accountController.create);
router.put('/api/accounts/:id', accountController.update);

/* User Router */
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);

/* OverdraftDebt Router */
router.post('/api/users/:id/overdraftDebt', overdraftDebtController.create);
router.get('/api/overdraftDebts/:id', overdraftDebtController.getByPK);
router.get('/api/overdraftDebts/:cpf/options', overdraftDebtController.getInstalmentsOptions);
router.get('/api/overdraftDebts/:cpf/check', overdraftDebtController.checkAmount);
router.post('/api/overdraftDebts/:id/instalments', overdraftDebtController.createInstalments);


/* Transaction Router */
router.get('/api/transactions', transactionController.list);
router.post('/api/accounts/:accountNumber/transactions/', transactionController.makeTransaction);
router.get('/api/transactions/:id', transactionController.getByPk);

/* Instalments Router */
router.post('/api/instalments/:id', instalmentController.create);

module.exports = router;