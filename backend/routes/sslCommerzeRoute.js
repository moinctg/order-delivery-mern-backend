import express from 'express';
import { 
    SSLCommerz_payment_init, 
    SSLCommerz_payment_cancel, 
    SSLCommerz_payment_fail, 
    SSLCommerz_payment_success 
} from '../controllers/sslCommerzeController.js';

const sslCommerzeRoute = express.Router();

sslCommerzeRoute.post("/checkout", SSLCommerz_payment_init);
sslCommerzeRoute.get("/checkout/success", SSLCommerz_payment_success); // Change to GET if needed for redirection
sslCommerzeRoute.post("/checkout/fail", SSLCommerz_payment_fail);
sslCommerzeRoute.post("/checkout/cancel", SSLCommerz_payment_cancel);

export default sslCommerzeRoute;
