import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://admin:admin12345@cluster0.bef5o5i.mongodb.net/Food-Order-System?retryWrites=true&w=majorityp').then(()=>{
       console.log('DB connected') ;
    })
}