// backend/models/Manager.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for the Manager model
const managerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'manager', // default role for the manager
        enum: ['manager', 'admin'] // Possible roles, including admin if needed
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving the Manager model
managerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        return next(error);
    }
});

// Compare password for login
managerSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Correcting model name to match the convention
const Manager = mongoose.model('Manager', managerSchema);

// Export the model using ES module syntax
export default Manager;
