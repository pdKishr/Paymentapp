const Router = require('express')
const router = Router()
const tokenVerifier = require('../middlewares/tokenVerifier.js')
const transferFund = require('../middlewares/transaction.js')
const {Account} = require('../database/db.js')

router.get('/balance',tokenVerifier, async (req,res)=>{
      
      const accountInfo = await Account.findOne({
        accountId : req.userId
      })
      
      res.json({
        balance : accountInfo.balance
      })
})

router.post('/transfer', tokenVerifier , async (req,res)=>{
   
    const input = req.body ;
  
    const accountInfo = await Account.findOne({
        accountId : req.userId
      })
   
    if(accountInfo.balance < input.amount) res.status(400).json({ 
        msg : 'insufficient balance'
    })

    else {
        transferFund(req.userId , input.toAccountId , input.amount)
            res.json({
                msg : 'Transfer successful'
            })
    }
   
})
console
module.exports = router;