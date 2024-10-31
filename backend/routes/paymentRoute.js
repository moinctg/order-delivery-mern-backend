import  express from  require('express');
const paymentRoute = express.Router();
const { initiatePayment, paymentSuccess, paymentFail, paymentCancel } = require('../controllers/paymentController');

paymentRoute.post('/initiate', initiatePayment);
paymentRoute.post('/success', paymentSuccess);
paymentRoute.post('/fail', paymentFail);
paymentRoute.post('/cancel', paymentCancel);

module.exports = router;
