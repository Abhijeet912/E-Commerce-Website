const Product=require('../models/product') //import product from models
const ErrorHandler=require('../utils/ErrorHandler');

const catchAysncErrors = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');


//create a new Product => /api/v1/products/new
exports.newProduct = catchAysncErrors(async(req,res,next) => {

    
    const product = await Product.create(req.body);
    
        res.status(201).json({
            success: true,
            product
        })
})
//Get all products => /api/v1/products?keyword=apple

exports.getProducts = catchAysncErrors(async(req, res, next) => {
  const resPerpage=4;
  const productCount= await Product.countDocuments();
  const apiFeatures=new APIFeatures(Product.find(),req.query )
  .search()
  .filter()
  .pagination(resPerpage)
  const products = await Product.find();
    res.status(200).json({
      success: true,
      count:products.length,
      productCount,
      products
    })
  })


  //get single product => /api/v1/products/:id
  exports.getSingleProduct = catchAysncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler('Product not found',404))
    }
    res.status(200).json({
      success: true,
      product
    })
  })

  //update product => /api/v1/admin/products/:id
  exports.updateProduct = catchAysncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id, req.body, {
    });
    if (!product) {
      return res.status(404).json({
        success:false,
        message: 'Product not found'
      })
    }
    product=await Product.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true,
      useFindAndModify:false
    });
    res.status(200).json({
      success: true,
      product
    })
  })

  //delete product => /api/v1/admin/products/:id
  exports.deleteProduct = catchAysncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success:false,
        message: 'Product not found'
      })
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message:'Product deleted successfully'
    })
  })