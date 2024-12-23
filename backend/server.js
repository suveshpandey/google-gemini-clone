require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { userRouter } = require('./routes/user');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);


app.listen(port, ()=>{
    console.log("Server is running...")
});