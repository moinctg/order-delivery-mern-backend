import  mongoose  from  'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Default stock to zero to avoid errors if not specified
  },
});

const Product   = mongoose.model('Product', productSchema);

export default Product