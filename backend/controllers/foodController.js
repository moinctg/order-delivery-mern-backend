
import fs from 'fs';
import foodModel from '../models/foodModel.js';

// Add food item
const addFood = async (req, res) => {
    try {
      const { name, description, price, category, imageUrl } = req.body;
  
      // Check if required fields are provided
      if (!name || !description || !price || !category || !imageUrl) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
      }
  
      const newFood = new foodModel({
        name,
        description,
        price,
        category,
        imageUrl // Store the imageUrl in the database
      });
  
      await newFood.save();
  
      res.status(201).json({ success: true, message: 'Food item added successfully.' });
    } catch (error) {
      console.error('Error adding food item:', error);
      res.status(500).json({ success: false, message: 'Server error.' });
    }
  };

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error fetching food items' });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            fs.unlink(`uploads/${food.image}`, () => {});

            await foodModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: 'Food Removed' });
        } else {
            res.status(404).json({ success: false, message: 'Food item not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error removing food item' });
    }
};

export { addFood, listFood, removeFood };







// import fs from 'fs'
// import foodModel from '../models/foodModel.js'

// //add food item

// const addFood = async (req,res) =>{

//     // let image_filename = `${req.file.filename}`;
//     const imageUrl = req.file?.path;

//     const food = new foodModel({
//         name: req.body.name,
//         description:req.body.description,
//         price:req.body.price,
//         category:req.body.category,
//         // image:image_filename
//         image:imageUrl
        
//     })

//     try {
//         await food.save();
//         res.json({success:true,message:'Food Added'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// // All food list

// const listFood = async (req,res) =>{
//     try {
//         const foods = await foodModel.find({});
//         res.json({success:true,data:foods})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// // remove food item

// const removeFood = async (req,res)=>{
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`,()=>{})

//         await foodModel.findByIdAndDelete(req.body.id)
//         res.json({success:true,message:'Food Removed'})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// export {addFood, listFood, removeFood}