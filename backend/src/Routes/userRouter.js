const Router = require('express')
const router = Router()
const zod = require('zod')
const {User,Account,secret} = require('../database/db.js')
const jwt = require('jsonwebtoken')
const tokenVerifier = require('../middlewares/tokenVerifier.js')

router.post('/signup', async (req,res)=>{  
    const input = req.body;
    const schema = zod.object({
        username : zod.string().email(),
        password : zod.string().min(6),
        firstname: zod.string().max(30).min(3),
        lastname : zod.string().max(30)
    })
     
    const validation = schema.safeParse(input);
    if(! validation.success){
        res.status(411).json({msg :"invalid input"})
    }
    else{
      const userExists = await User.findOne({username : input.username})
      if(!userExists){
        const newUser =  await User.create({
            username : input.username,
            password : input.password,
            firstname: input.firstname,
            lastname : input.lastname
        })      
        
        const randomNumber = Math.round(1 +  Math.random()*10000)

         await Account.create({
            accountId : newUser._id,
            balance   : randomNumber
        })
        
        const jwtToken = jwt.sign({userId : newUser._id},secret)
    
        res.status(200).json({
            msg   : 'user created successfully',
            token : jwtToken,
            name : newUser.firstname
        })   
      }

      else{
        res.status(403).json({msg : "Email already taken"})
      }
    }
})

router.post('/signin', async (req,res)=>{
    const input = req.body
    const user  = await User.findOne({username : input.username,password : input.password})
    if(!user){
        res.status(411).json({msg : "username or password not matched"})
    }else{
        const jwtToken = jwt.sign({userId : user._id},secret)
        res.status(200).json({token : jwtToken,name:user.firstname})
    }
   
})

router.put("/update",tokenVerifier, async (req,res)=>{
    console.log('reached')
    const input = req.body ;
    const schema = zod.object({
        password : zod.string().min(6).optional(),
        firstname: zod.string().max(30).min(1).optional(),
        lastname : zod.string().max(30).min(1).optional()
    })

    const valid = schema.safeParse(input);
    if(!valid.success){
        res.status(411).json('error while updating')
    }
    else{
        await User.updateOne({_id : req.headers.userid},input)
        res.status(200).json({msg : "updated successfully"})
    }
})

router.get("/bulk",tokenVerifier, async(req,res)=>{
    const filter = req.query.filter;
  
    const users = await User.find(
        {username : {$regex : filter}}
    )

    res.status(200).json({
        users : users.map((user)=>({
            username : user.username,
            firstname: user.firstname,
            lastname : user.lastname,
            userId : user._id
        }))
    })
})

module.exports = router;