const express = require('express');
const { verifyToken } = require('../auth/Authentication');
const { addComment, editComment, deleteComment, fetchComments } = require('../controllers/FeedbackController');

const router = express.Router();

router.post('/add-comment', verifyToken, addComment);
router.post('/edit-comment', verifyToken, editComment);
router.post('/delete-comment', verifyToken, deleteComment);
router.get('/fetch-comments', verifyToken, fetchComments);

module.exports = router;