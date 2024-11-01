import express from "express"
import authMiddleware from './../middleware/auth.js';
import { placeOrder, verifyOrder, userOrders,listOrders,updateStatus,summeryOrders, getDailyOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get('/list',listOrders)
orderRouter.get('/summary', summeryOrders)
// Get Daily Order List 
orderRouter.get('/daily-orders',getDailyOrders)

orderRouter.post('/status', updateStatus)

export default orderRouter;

