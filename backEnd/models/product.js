const mongoose=require(`mongoose`)

const productSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please enter a product name'],
        trim:true,
        maxLength:[100,'Product name cannot exceed 100 characters']
    },
    price: {
        type:Number,
        required:[true, 'Please enter a price name'],
        trim:true,
        maxLength:[100,'Price cannot exceed 100 characters']
    },
    description: {
        type:String,
        required:[true, 'Please enter a product name'],
    },
    ratings: {
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        ref:'Category',
        required:[true,'Please select category for this product'],
        enum:{
            values:['Clothes/Shoes','Accessories','Electronics','Cameras','Food','Books','Beauty/Health','Sports','Outdoor','Home'],
            message:'Please select a valid category'
        }
    },
    seller:{
        type:String,
        required:[true,'Please select seller for this product'],
    },
    stock:{
        type:Number,
        required:[true,'Please enter stock'],
        maxLength:[5,'Product name cannot exceed 5 characters'],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ]
    
})
module.exports=mongoose.model('Product',productSchema);