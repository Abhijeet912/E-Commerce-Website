const app = require(`./app`)

//setsup config files
const dotenv=require(`dotenv`);
dotenv.config({path:`backEnd/config/config.env`})

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});