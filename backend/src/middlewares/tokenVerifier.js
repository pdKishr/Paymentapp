const jwt = require('jsonwebtoken')
const {secret} = require('../database/db')

const middleware = (req,res,next)=>{
 
     const input = req.headers.auth.split(" ")
    
     const token = input[1]
     let output;
     let catched = false;
      try{
        output= jwt.verify(token,secret)
      }
      catch(e){
        catched = true;
      }
    
      if(catched){
       res.json({msg : 'authentication fails'})
      } 
      else{
        req.userId = output.userId;
        next()
      }
      
}

module.exports = middleware