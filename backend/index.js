const express = require('express');
const app = express()

const userRouter =require('./src/Routes/userRouter.js')
const accountRouter =require('./src/Routes/accountRouter.js')
const cors =require('cors')

app.use(cors())
app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/account',accountRouter);

const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server listening to port${PORT}`)
})



