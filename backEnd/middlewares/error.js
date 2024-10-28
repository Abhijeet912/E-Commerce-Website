const ErrorHandler = require('../utils/ErrorHandler');



module.exports=(err,req,res,next) => {
    err.statusCode=err.statusCode|| 500;
    //err.message=err.message||'Internal Server Error';
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }
    if(process.env.NODE_ENV ==='PRODUCTION' ){
        let error={...err}
        error.message = err.message;

        //wrong mongoose id error 
        if(err.name ==='castError'){
            const message=`Resource not found. Invalid: ${err.path}`;
            error=new ErrorHandler(message,400);
        }
        //Handling Moongoose Validation Error
        if(err.name==='validationError'){
            const message=Object.values(err.errors).map(value =>value.message);
            error=new ErrorHandler(message,400);
        }
        res.status(err.statusCode).json({
        success: false,
        message: err.message||'internal Server Error'
    })
    }
    
    
};