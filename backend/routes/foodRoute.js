
import express from 'express';
import { addFood, listFood, removeFood } from '../controllers/foodController.js';
import multer from 'multer';
import upload from '../utils/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const foodRouter = express.Router();

// Post request to add food item (with authentication middleware)
foodRouter.post('/add', upload.single('image'), addFood);

// Get request to list all food items
foodRouter.get('/list', listFood);

// Post request to remove food item
foodRouter.post('/remove', adminAuth, removeFood);

export default foodRouter;






// import express from 'express'
// import { addFood, listFood, removeFood } from '../controllers/foodController.js'
// import multer from 'multer'

// import upload from '../utils/multer.js';
// import  adminAuth  from '../middleware/adminAuth.js';



// const foodRouter = express.Router();

// // Image Storage Engine


// // const storage = new CloudinaryStorage({
// //     cloudinary: cloudinary,
// //     params: {
// //         destination: 'uploads', // optional folder name in your Cloudinary account
// //       format: async (req, file) => 'jpeg', 'png' // you can change this to 'png' or 'jpg'
// //       public_id: (req, file) => file.originalname.split('.')[0], // setting a unique ID for the file
// //     },
// //   });
  
// //   const upload = multer({ storage: storage });



// // const storage = multer.diskStorage({
// //     destination:"uploads",
// //     filename: (req,file,cb)=>{
// //         return cb(null,`${Date.now()}${file.originalname}`)
// //     }
// // })

// // const upload = multer({storage:storage})
// foodRouter.post('/add',adminAuth,upload. single('image'),addFood)
// foodRouter.get('/list',listFood)
// foodRouter.put('/edit',listFood)
// foodRouter.post('/remove', removeFood)

// export default foodRouter;