var express = require('express');
var router = express.Router();

const accountController = require('../controllers').account;
const userController = require('../controllers').user;
const overdraftController = require('../controllers').overdraft;
const overdraftDebtController = require('../controllers').overdraftDebt;
const transactionController = require('../controllers').transaction;
const instalmentController = require('../controllers').instalment;
const startController = require('../controllers').start;


router.get('/transaction', function (req, res) {
    res.sendFile('/app/src/views/index.html');
});

/* Overdraft Router */
router.get('/api/overdrafts', overdraftController.list);
router.get('/api/users/:id/overdrafts', overdraftController.getByPk);
router.post('/api/users/:id/overdrafts', overdraftController.create);
router.post('/api/users/:id/overdrafts/createDebt', overdraftController.createDebt);
router.put('/api/users/:id/overdrafts/activate', overdraftController.activateCredit);
router.put('/api/users/:id/overdrafts/cancel', overdraftController.cancelCredit);
router.put('/api/users/:id/overdrafts', overdraftController.updateCreditLimit);
router.delete('/api/users/:id/overdrafts', overdraftController.delete);
router.get('/api/users/:id/overdrafts/usability', overdraftController.checkUsability);

/* Account Router */
router.get('/api/accounts/:id', accountController.getByPk);
router.post('/api/accounts', accountController.create);
router.put('/api/accounts/:id', accountController.update);

/* User Router */
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);

/* OverdraftDebt Router */
router.post('/api/users/:id/overdraftDebt', overdraftDebtController.create);
router.get('/api/overdraftDebts/:id', overdraftDebtController.getLast);
router.get('/api/overdraftDebts/:id/options', overdraftDebtController.getInstalmentsOptions);
router.get('/api/overdraftDebts/:id/check', overdraftDebtController.checkAmount);
router.post('/api/overdraftDebts/:id/instalments', overdraftDebtController.createInstalments);
router.get('/api/overdraftDebts/:id/listDebt', overdraftDebtController.debtsList);

/* Transaction Router */
router.get('/api/transactions', transactionController.list);
router.post('/api/transactions/', transactionController.makeTransaction);
router.get('/api/transactions/:id', transactionController.getByPk);

/* Instalments Router */
router.post('/api/instalments/:id', overdraftDebtController.createInstalments);
router.get('/api/overdraftDebt/:overdraftDebtId/listInstalments',instalmentController.listByDebt);
router.put('/api/payinstalments/:id', instalmentController.payInstalment);

/* Start Router */
router.post('/api/start', startController.startApp);

/* GET properties listing. */
// router.get("/", function(req, res, next) {
//     res.send(routeList.join("</br>"));
//   });
//   let routeList = router.stack.map(r => {
//     if (r.route && r.route.path) {
//       return (
//         r.route.path +
//         " : " +
//         Object.keys(r.route.methods)
//           .map(m => (r.route.methods[m] ? `${m}` : ``))
//           .join(",")
//       );
//     }
//   });
  

module.exports = router;