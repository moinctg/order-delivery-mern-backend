import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import path from 'path';
import  bodyParser from 'body-parser';
import { fileURLToPath } from 'url'; // Required for ESM to define __dirname
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import sslCommerzeRoute from './routes/sslCommerzeRoute.js';
import adminRoute from './routes/adminRoutes.js';
import productRouter from './routes/productRoutes.js';

// App config
const app = express();
const port =  8000;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// Serve static files (e.g., image uploads)
app.use("/images", express.static(path.join(__dirname, 'uploads')));

// API endpoints
app.use("/api/food", foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment', sslCommerzeRoute);
app.use('/api/admin', adminRoute);
app.use('/api/products', productRouter);

// Test endpoint
app.get("/", (req, res) => {
    res.send("API is working");
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});




// import express from 'express'
// // require('dotenv').config()
// import 'dotenv/config';
// import cors from 'cors'
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { connectDB } from './config/db.js'
// import foodRouter from './routes/foodRoute.js'
// import userRouter from './routes/userRoute.js';
// import feedbackRoutes from './routes/feedbackRoutes.js'

// // import 'dotenv/config';
// import cartRouter from './routes/cartRoute.js';
// import orderRouter from './routes/orderRoute.js';
// import sslCommerzeRoute from './routes/sslCommerzeRoute.js';
// import adminRoute from './routes/adminRoutes.js';
// import productRouter from './routes/productRoutes.js';
// //app config
// const app = express()
// const port =  8000;

// // middleware
// app.use(express.json())
// app.use(cors())

// //db connection
// connectDB();

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// // Manually define __dirname for ES modules
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // Serve static files
// // const frontendBuildPath = path.join(__dirname, 'dist');

// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// // });
// // Serve static files
// app.use("/images", express.static(path.join(__dirname, 'uploads')));


// // api endpoints
// app.use("/api/food",foodRouter)
// // app.use("/images",express.static('uploads'))
// app.use('/api/user', userRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)
// app.use('/api/feedback', feedbackRoutes); // Use feedback routes

// app.use('/api/payment', sslCommerzeRoute);   //ssl commerce payment
// app.use('/api/admin', adminRoute);
// app.use('/api/products', productRouter);
// app.get("/",(req,res)=>{
//         res.send("API working")
// })

// app.listen(port,()=>{
//     console.log(`Server started on http://localhost:${port}`)
// })

// //mongodb+srv://dulanjalisenarathna93:E2JUb0zfaT2FVp8D@cluster0.exkxkun.mongodb.net/?