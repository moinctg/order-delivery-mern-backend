import  express from 'express';
import { getProductStatus, updateProductStock } from '../controllers/productController.js';
const productRouter = express.Router();

// Route to get the product status
productRouter.get('/status/:id', getProductStatus);

// Route to update product stock after sale
productRouter.post('/update-stock', updateProductStock);

export default productRouter;