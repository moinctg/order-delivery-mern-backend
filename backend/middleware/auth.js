// import  jwt  from 'jsonwebtoken';

// const authMiddleware = async (req, res, next) =>{
//     const {token} = req.headers;
//     if(!token){
//         return res.json({success:false, message:'Not Authorized, login again'})
//     }

//     try {
//         const token_decode = jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
//         next();
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message:'Error'})
//     }
// }

// export default authMiddleware;


import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token provided' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID in the token
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next(); // Move to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
};

export default auth;
