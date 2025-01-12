const express=require('express');
const app=express();
const errorMiddleware=require('./middlewares/error');
app.use(express.json());



//import all routes
const products=require('./routes/product')
const auth=require('./routes/auth')


app.use('/api/v1',products)
app.use('/api/v1',auth)

//Middleware to handle errors
app.use(errorMiddleware);
module.exports = app;

//