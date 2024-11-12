
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decodedToken.id);
        
        if (user && user.email === 'admin@food-order-deliver-24.com' && user.role === 'admin') {
            req.user = user;
            next();
        } else {
            return res.status(403).json({ message: "Admin access only" });
        }
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
};

export default adminAuth;









// // middlewares/adminAuth.js
// import jwt from 'jsonwebtoken';
// import User from '../models/userModel.js';

//  const adminAuth = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
//         const user = await User.findById(decodedToken.id);
        
//         if (user && user.email === 'admin@food-order-deliver-24.com' && user.role === 'admin') {
//             req.user = user;
//             next();
//         } else {
//             return res.status(403).json({ message: "Admin access only" });
//         }
//     } catch (error) {
//         res.status(401).json({ message: "Authentication failed" });
//     }
// };

// export default adminAuth
