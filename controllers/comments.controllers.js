const CommentsModel = require('../models/comments.models');
exports.getComments = async (req, res) => {
    try {
        const comments = await CommentsModel.find()
            .populate({ path: 'episode_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const comment = await CommentsModel.findById(req.params.id)
            .populate({ path: 'episode_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        if (comment == null) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommentsByUserId = async (req, res) => {
    try {
        const comments = await CommentsModel.find({ user_id: req.params.id })
            .populate({ path: 'episode_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this user' });
        }
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCommentsByEpisodeId = async (req, res) => {
    try {
        const comments = await CommentsModel.find({ episode_id: req.params.id })
            .populate({ path: 'episode_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this episode' });
        }
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createComment = async (req, res) => {
    const { review, episode_id, user_id } = req.body;

    try {
        const newComment = new CommentsModel({ review, episode_id, user_id });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateComment = async (req, res) => {
    try {
        const comment = await CommentsModel.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Not found' });
        }

        const { review } = req.body;
        comment.review = review;

        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await CommentsModel.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Not found' });
        }

        await CommentsModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

