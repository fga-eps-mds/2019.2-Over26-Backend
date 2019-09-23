var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
const overdraftController = require('../controllers').overdraft;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

router.get('/api/overdrafts', overdraftController.list);
router.get('/api/overdrafts/:id', overdraftController.getByPk);
router.post('/api/overdrafts', overdraftController.create);
router.put('/api/overdrats/:id', overdraftController.update);
router.delete('/api/overdrafts/:id', overdraftController.delete);

router.get('/api/users', userController.list);
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.delete);

module.exports = router;