import Feedback from './../models/feedback.js';
import userModel from './../models/userModel.js';

// Controller for submitting feedback
const submitFeedback = async (req, res) => {
    try {
        const { userId, feedbackText, rating } = req.body;

        // Check if the user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create new feedback
        const feedback = new Feedback({
            user: userId,
            feedbackText,
            rating
        });
        
        // Save feedback to database
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully', feedback });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback', error });
    }
};

// Controller for retrieving all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('user', 'name email'); // Populates user details
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedbacks', error });
    }
};

// Controller for retrieving feedback by specific user
const getFeedbackByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const feedbacks = await Feedback.find({ user: userId }).populate('user', 'name email');
        
        if (!feedbacks || feedbacks.length === 0) {
            return res.status(404).json({ message: 'No feedback found for this user' });
        }
        
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback for user', error });
    }
};

export { submitFeedback, getAllFeedbacks, getFeedbackByUser };
