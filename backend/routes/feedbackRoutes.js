import express from 'express'
const feedbackController = require('../controllers/feedbackController');

const router = express.Router();

// Route for submitting feedback
router.post('/submit', feedbackController.submitFeedback);

// Route for retrieving all feedbacks
router.get('/all', feedbackController.getAllFeedbacks);

// Route for retrieving feedback by a specific user
router.get('/user/:userId', feedbackController.getFeedbackByUser);

module.exports = router;
