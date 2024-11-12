import Product from '../models/Product.js';

// Get product status by ID
const getProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const status = product.stock > 0 ? 'Available' : 'Out of Stock';
    res.json({ status, stock: product.stock });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product status' });
  }
};

// Update stock after a sale
const updateProductStock = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    product.stock -= quantity; // Deduct the quantity sold
    await product.save();

    res.json({ message: 'Stock updated', stock: product.stock });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stock' });
  }
};

export {updateProductStock,getProductStatus}