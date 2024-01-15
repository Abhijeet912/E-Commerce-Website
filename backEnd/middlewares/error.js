const ErrorHandler = require('../utils/ErrorHandler');



module.exports=(err,req,res,next) => {
    err.statusCode=err.statusCode|| 500;
    //err.message=err.message||'Internal Server Error';
    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            errpr:err,
            errMessage:err.message,
            stack:err.stack
        })
    }
    if(process.env.NODE_ENV ==='PRODUCTION' ){
        let error={...err}
        error.message = err.message;
        res.status(err.statusCode).json({
        success: false,
        message: err.message||'internal Server Error'
    })
    }
    
    
};