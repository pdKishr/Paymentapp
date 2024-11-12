const {Account} = require('../database/db.js')

const transferFund= async (fromAccountId,toAccountId,Amount)=>{
      await Account.updateOne({accountId : fromAccountId},{$inc: {balance : -Amount}})
      await Account.updateOne({accountId : toAccountId  },{$inc: {balance :  Amount}})
}

module.exports = transferFund