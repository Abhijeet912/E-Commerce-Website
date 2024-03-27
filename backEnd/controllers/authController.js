const User=require('../models/user');
const ErrorHandler=require('../utils/ErrorHandler');
const catchAsyncErrors=require('../middlewares/catchAsyncError');


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


res.status(201).json({
    success: true,
    user
})
});