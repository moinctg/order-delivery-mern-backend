
import  axios from  require('axios');
const { SSLCOMMERZ_STORE_ID, SSLCOMMERZ_STORE_PASSWORD, BASE_URL } = process.env;

// Initiate payment
const initiatePayment = async (req, res) => {
    const { amount, currency, tran_id, success_url, fail_url, cancel_url, customer } = req.body;
    const data = {
        store_id: SSLCOMMERZ_STORE_ID,
        store_passwd: SSLCOMMERZ_STORE_PASSWORD,
        total_amount: amount,
        currency,
        tran_id,
        success_url: `${BASE_URL}/api/payment/success`,
        fail_url: `${BASE_URL}/api/payment/fail`,
        cancel_url: `${BASE_URL}/api/payment/cancel`,
        cus_name: customer.name,
        cus_email: customer.email,
        cus_add1: customer.address,
        cus_phone: customer.phone,
    };

    try {
        const response = await axios.post(
            'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
            data
        );
        if (response.data && response.data.GatewayPageURL) {
            res.status(200).json({ url: response.data.GatewayPageURL });
        } else {
            res.status(400).json({ message: 'Payment initiation failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'SSLCommerz request error', error });
    }
};

// Handle success, failure, and cancellation
const paymentSuccess = (req, res) => {
    // Handle successful payment response
    res.json({ message: 'Payment successful', data: req.body });
};

const paymentFail = (req, res) => {
    // Handle failed payment response
    res.json({ message: 'Payment failed', data: req.body });
};

const paymentCancel = (req, res) => {
    // Handle canceled payment response
    res.json({ message: 'Payment canceled', data: req.body });
};

module.exports = { initiatePayment, paymentSuccess, paymentFail, paymentCancel };
