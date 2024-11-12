import mongoose from "mongoose";

export  const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           writeConcern: { w: 'majority' },
        });
        console.log('Connected to MongoDB');
     } catch (error) {
        console.error('Error connecting to MongoDB:', error);
     }
}
export default connectDB;

// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI); // Only the URI is needed now
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
//   }
// };


