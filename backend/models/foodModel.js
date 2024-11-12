
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      imageUrl: {
        type: String,
        required: false // Make sure this is not required if you're handling images via URL
      }
   
   
   
    // URL from Cloudinary or other sources
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;







// import mongoose from "mongoose";

// const foodSchema = new mongoose.Schema({
//     name: {type: String,required: true},
//     description: {type: String,required: true},
//     price: {type: Number,required: true},
//     image: {type: String,required: true},
//     category: {type: String,required: true},
//     imageUrl: {
//         type: String, // URL from Cloudinary
//         required: true
//     }
// },
//  { timestamps: true });


// const foodModel = mongoose.model.food || mongoose.model("food",foodSchema);

// export default foodModel;