const overdraft = require('./overdraft');
const account = require('./account');
const user = require('./user');
const transaction = require('./transaction');
const overdraftDebt = require('./overdraftDebt');


module.exports = {
  // Add your controllers here
  user,
  overdraft,
  account,
  transaction,
  overdraftDebt,

};
