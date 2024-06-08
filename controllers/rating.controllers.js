const RatingModel = require('../models/rating.models');
const CoursesModel = require('../models/courses.models');
const UserModel = require('../models/users.models');

exports.getRating = async (req, res) => {
    try {
        const rating = await RatingModel.find()
            .populate({ path: 'course_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        res.json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRatingById = async (req, res) => {
    try {
        const rating = await RatingModel.findById(req.params.id)
            .populate({ path: 'course_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        if (rating == null) {
            return res.status(404).json({ message: 'Not found' });
        }
        res.json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getRatingByUserId = async (req, res) => {
    try {
        const rating = await RatingModel.find({ user_id: req.params.id })
            .populate({ path: 'course_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        if (rating.length === 0) {
            return res.status(404).json({ message: 'No found for this user' });
        }
        res.json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.getRatingByCourseId = async (req, res) => {
    try {
        const rating = await RatingModel.find({ course_id: req.params.id })
            .populate({ path: 'course_id', select: 'title' })
            .populate({ path: 'user_id', select: 'username full_name' });
        if (rating.length === 0) {
            return res.status(404).json({ message: 'No found for this course' });
        }
        res.json(rating);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createRating = async (req, res) => {
    const { user_id, course_id, score, review } = req.body;

    if (score < 1 || score > 5) {
        return res.status(400).json({ message: 'Rating score must be between 1 and 5' });
    }

    try {
        const existingRating = await RatingModel.findOne({ user_id, course_id });
        if (existingRating) {
            return res.status(400).json({ message: 'User has already rated this course' });
        }

        const rating = new RatingModel({ user_id, course_id, score, review });
        const newRating = await rating.save();
        res.status(201).json(newRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.updateRating = async (req, res) => {
    try {
        const rating = await RatingModel.findById(req.params.id);
        if (rating == null) {
            return res.status(404).json({ message: 'Not found' });
        }

        const { score, review } = req.body;
        if (score < 1 || score > 5) {
            return res.status(400).json({ message: 'Rating score must be between 1 and 5' });
        }

        rating.score = score;
        rating.review = review;

        const updatedRating = await rating.save();
        res.json(updatedRating);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteRating = async (req, res) => {
    try {
        const rating = await RatingModel.findById(req.params.id);
        if (rating == null) {
            return res.status(404).json({ message: 'Not found' });
        }

        await RatingModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};