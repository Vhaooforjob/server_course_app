const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments.controllers');

router.get('/',commentController.getComments);
router.get('/:id',commentController.getCommentById);
router.get('/episode/:id',commentController.getCommentsByEpisodeId);
router.get('/user/:id',commentController.getCommentsByUserId);
router.post('/',commentController.createComment);
router.put('/:id',commentController.updateComment);
router.delete('/:id',commentController.deleteComment);


module.exports = router;