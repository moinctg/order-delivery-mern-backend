import express from 'express';
import { submitFeedback, getAllFeedbacks, getFeedbackByUser } from './../controllers/feedbackController.js';

const router = express.Router();

// Route to submit feedback
router.post('/submit', submitFeedback);

// Route to get all feedback
router.get('/', getAllFeedbacks);

// Route to get feedback by user ID
router.get('/:userId', getFeedbackByUser);

export default router;

