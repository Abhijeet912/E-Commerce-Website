const app = require(`./app`)
const connectDatabase=require(`./config/database`)
//setsup config files
const dotenv=require(`dotenv`);
dotenv.config({path:`backEnd/config/config.env`})


//Handle uncaught exceptions
process.on('uncaughtException',err=>{
    console.log(`Error: ${err.stack}`);
    console.log(`Shutting down due to uncaught exception: ${err.stack}`);
    process.exit(1);
})
//connected database
connectDatabase();



const server=app.listen(process.env.PORT, ()=>{
    console.log(`Server started on : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

//Handle unhandled promise rejection
process.on('unhandledRejection', err=>{
    console.log(`error: ${err.message}`);
    console.log(`Shuttingdown the server due to unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1)
    })
})