import express from 'express'
import { loginUser, registerUser,getUserProfile } from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
router.get('/me', authMiddleware, getUserProfile); // Protected route
export default userRouter;
