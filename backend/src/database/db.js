const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://pdkishr:lAQJKjR3JFEdOPhW@cluster0.7bxly.mongodb.net/PayTm')

const userSchema = new mongoose.Schema({
   
    username : {
       type : String,
       require : true,
       unique : true,
       trim: true,
       lowercase : true,
    },

    password : {
        type : String,
        require : true,
        minLength : 6
    },

    firstname: {
        type : String ,
        required : true,
        trim: true,
        maxLength : 30,
    },

    lastname : {
        type : String ,
        required : true,
        trim: true,
        maxLength : 30,
    }
})

const AccountSchema = new mongoose.Schema({
      accountId : {type : mongoose.Schema.Types.ObjectId, ref : "User",required: true},
      balance   : {type : Number, required : true}
})

const User = mongoose.model('User',userSchema)
const Account = mongoose.model('Account',AccountSchema)
const secret    = 'jwt123pdkishr'

module.exports = {User, Account,secret}