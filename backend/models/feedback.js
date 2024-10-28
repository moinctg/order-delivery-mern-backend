// models/Feedback.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // foreign key linking to User model
    feedbackText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;