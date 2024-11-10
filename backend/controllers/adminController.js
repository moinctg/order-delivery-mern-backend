// backend/controllers/adminController.js
import bcrypt  from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Manager from '../models/Manager.js';
import  Admin from '../models/admin.js'; // Assuming there's an Admin model for admin data

const JWT_SECRET = process.env.JWT_SECRET; // Replace with an environment variable in production

// Admin login function
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin._id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create manager function
const createManager = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        // Check if manager already exists
        const existingManager = await Manager.findOne({ email });
        if (existingManager) {
            return res.status(400).json({ message: 'Manager with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new manager
        const manager = new Manager({
            email,
            password: hashedPassword,
            role,
        });
        await manager.save();

        res.json({ message: 'Manager created successfully', manager });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update manager role function
const updateManager = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        const manager = await Manager.findById(id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        // Update role
        manager.role = role;
        await manager.save();

        res.json({ message: 'Manager role updated successfully', manager });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete manager function
const deleteManager = async (req, res) => {
    const { id } = req.params;
    try {
        const manager = await Manager.findByIdAndDelete(id);
        if (!manager) {
            return res.status(404).json({ message: 'Manager not found' });
        }

        res.json({ message: 'Manager deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// List all managers function
const listManagers = async (req, res) => {
    try {
        const managers = await Manager.find({});
        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export {listManagers,deleteManager,updateManager,createManager, loginAdmin}