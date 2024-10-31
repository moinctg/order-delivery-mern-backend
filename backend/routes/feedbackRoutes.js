import express from 'express';
import { submitFeedback, getAllFeedbacks, getFeedbackByUser } from './../controllers/feedbackController.js';

const feedbackRouter  = express.Router();

// Route to submit feedback
feedbackRouter.post('/submit', submitFeedback);

// Route to get all feedback
feedbackRouter.get('/', getAllFeedbacks);

// Route to get feedback by user ID
feedbackRouter.get('/:userId', getFeedbackByUser);

export default feedbackRouter;

