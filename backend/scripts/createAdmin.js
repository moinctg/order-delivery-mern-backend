import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AdminModel from '../models/Admin.js';

// Load environment variables
dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
      // Check if an admin already exists to avoid duplicates
      const existingAdmin = await AdminModel.findOne({ email: 'admin@food-order-deliver-24.com' });
      if (existingAdmin) {
          console.log('Admin already exists!');
          return mongoose.disconnect();
      }

      // Create new admin
      const admin = new AdminModel({
          email: 'admin@food-order-deliver-24.com',
          password: 'admin1234',
          role: 'admin',
      });

      await admin.save();  // The password will be hashed automatically before save because of the pre-save hook
      console.log('Admin created successfully!');
      mongoose.disconnect();
  })
  .catch(error => console.log('Error creating admin:', error));
