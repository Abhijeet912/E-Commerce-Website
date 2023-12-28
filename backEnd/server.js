const app = require(`./app`)
const connectDatabase=require(`./config/database`)
//setsup config files
const dotenv=require(`dotenv`);
dotenv.config({path:`backEnd/config/config.env`})

//connected database
connectDatabase();



app.listen(process.env.PORT, ()=>{
    console.log(`Server started on : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});