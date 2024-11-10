// routes/adminRoutes.js
import express from 'express';
import { loginAdmin, createManager, updateManager, deleteManager, listManagers } from '../controllers/adminController.js';
import  adminAuth  from  '../middleware/adminAuth.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.get('/managers', adminAuth, listManagers);
adminRouter.post('/manager', adminAuth, createManager);
adminRouter.put('/manager/:id', adminAuth, updateManager);
adminRouter.delete('/manage/:id', adminAuth, deleteManager);

export default adminRouter;


// const { loginAdmin, createManager, updateManager, deleteManager, listManagers } = require('../controllers/adminController');
// const adminAuth = require('../middlewares/adminAuth');

// router.post('/login', loginAdmin);
// router.get('/managers', adminAuth, listManagers);
// router.post('/manager', adminAuth, createManager);
// router.put('/manager/:id', adminAuth, updateManager);
// router.delete('/manager/:id', adminAuth, deleteManager);
