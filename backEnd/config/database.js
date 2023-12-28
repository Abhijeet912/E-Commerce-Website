const mongoose =require(`mongoose`)




const connectDatabase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        autoIndex:false,
        family: 4
    }).then(con =>{
        console.log(`MongoDB database connected with host: ${con.connection.host}`)
    })
}
module.exports=connectDatabase