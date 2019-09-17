var express = require('express');
var router = express.Router();

const userController = require('../controllers').user;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond witsh a resource');
});

router.get('/api/users', userController.list);
router.get('/api/users/:id', userController.getByPk);
router.post('/api/users', userController.create);
router.put('/api/users/:id', userController.update);
router.delete('/api/users/:id', userController.delete);

module.exports = router;