const User=require('../models/user');
const ErrorHandler=require('../utils/ErrorHandler');
const catchAsyncErrors=require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');


//register user => /api/v1/register
exports.registerUser=catchAsyncErrors(async(req,res,next) => {
    const{name,email,password}=req.body;

    const user=await User.create({name:name,
        email:email,
        password:password,
        avatar:{
            public_id:'v1709038255/users/Manish_Mathur_sreqh7',
            url:'https://res.cloudinary.com/dsiqj7ges/image/upload/v1709038255/users/Manish_Mathur_sreqh7.jpg'
        }});

        
   sendToken(user,200,res);
});


//login user =>/api/v1/login
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;

    //check if email and password is entered by user
    if(!email||!password){
        return next(new ErrorHandler('Please enter email and password',400))

    }

    //finding user in db
    const user= await User.findOne({email}).select('+password')


    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }
    //checks if password is correct or not
    const isPasswordMatched= await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Please enter correct email and password',401))
    }
    sendToken(user,200,res);
    
})