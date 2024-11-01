import orderModel from './../models/orderModel.js';
import userModel from './../models/userModel.js';
import Stripe from "stripe"

const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order for frontend
const placeOrder = async (req, res) =>{

    const frontend_url = 'https://food-order-deliver-24.vercel.app';
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount:req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items = req.body.items.map((item)=>({
            price_data :{
                currency: "bdt",
                product_data:{
                    name: item.name
                },
                unit_amount:item.price*100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data :{
                currency:"bdt",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

const verifyOrder = async (req, res) =>{
    const {orderId, success} = req.body;
    try {
        if(success=='true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

// listing orders for admin panel
const listOrders = async (req,res) =>{
   try {
    const orders = await orderModel.find({});
    res.json({success:true, data:orders})
   } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})  
   } 
}

// daily order for admin panel 

const getDailyOrders = async (req, res) => {
    try {
        // Get the start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
    
        // Query to find orders created within today
        const dailyOrders = await orderModel.find({
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        });
    
        res.json(dailyOrders);
      } catch (error) {
        console.error("Error fetching daily orders:", error);
        res.status(500).json({ error: "Server error" });
      }
};

// listing orders for admin panel datewaise 
// const summeryOrders = async (req, res) => {
//     console.log('Received request for summary orders:', req.query);
//     const { startDate, endDate } = req.query;

//     // Build the query to filter orders by a date range if provided
//     let query = {};
//     if (startDate && endDate) {
//         query.createdAt = {
//             $gte: new Date(startDate),
//             $lte: new Date(endDate)
//         };
//     }

//     try {
//         // Retrieve orders based on the query and populate associated items
//         const orders = await orderModel.find(query).populate('item');
        
//         // Generate a summary grouped by date
//         const summary = orders.reduce((acc, order) => {
//             const date = new Date(order.createdAt).toLocaleDateString();
            
//             // Initialize the date entry if it doesn't exist
//             if (!acc[date]) {
//                 acc[date] = { totalOrders: 0, totalRevenue: 0 };
//             }
            
//             // Increment the counts and total revenue
//             acc[date].totalOrders += 1;
//             acc[date].totalRevenue += order.amount;  // Assuming `amount` is the revenue for each order
            
//             return acc;
//         }, {});

//         res.json(summary);
//     } catch (err) {
//         console.error("Error generating summary:", err);
//         res.status(500).json({ message: "Server error. Could not retrieve order summary." });
//     }
// };

// controllers/orderController.js
 const summeryOrders = async (req, res) => {
    console.log("Received request for order summary"); // Debug log
    const { startDate, endDate } = req.query;

    let query = {};

    if (startDate && endDate) {
        query.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    try {
        const orders = await orderModel.find(query).populate('item');
        let summary = orders.reduce((acc, order) => {
            const date = new Date(order.createdAt).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = { totalOrders: 0, totalRevenue: 0 };
            }
            acc[date].totalOrders += 1;
            acc[date].totalRevenue += order.amount;
            return acc;
        }, {});

        res.json(summary);
    } catch (err) {
        console.error("Error fetching summary:", err); // Debug log
        res.status(500).json({ message: err.message });
    }
};

// export default summeryOrders;

// api for updating order status
const updateStatus = async (req, res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})  
    }
}

export {placeOrder, verifyOrder, userOrders,listOrders, updateStatus, summeryOrders , getDailyOrders}