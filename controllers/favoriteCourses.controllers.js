const Favorite = require('../models/favoriteCourses.models');
const CoursesModel = require('../models/courses.models');
const UserModel = require('../models/users.models');

exports.getFavoriteCourses = async (req, res) => {
    try {
        const favorites = await Favorite.find().populate('course_id').populate('user_id');
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFavoriteCoursesById = async (req, res) => {
    try {
        const favorites = await Favorite.findById(req.params.id).populate('course_id').populate('user_id');
        if (favorites == null) {
            return res.status(404).json({ message: 'Favorite not found' });
        }
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFavoriteCoursesByUserId = async (req, res) => {
    try {
        const favorites = await Favorite.find({ user_id: req.params.id }).populate('course_id').populate('user_id');
        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorites found for this user' });
        }
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFavoriteCoursesByCourseId = async (req, res) => {
    try {
        const favorites = await Favorite.find({ course_id: req.params.id }).populate('course_id').populate('user_id');
        if (favorites.length === 0) {
            return res.status(404).json({ message: 'No favorites found for this course' });
        }
        res.json(favorites);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createFavoriteCourses = async (req, res) => {
    const favorites = new Favorite({
        course_id: req.body.course_id,
        user_id: req.body.user_id
    });

    try {
        const newFavorite = await favorites.save();
        res.status(201).json(newFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateFavoriteCourses = async (req, res) => {
    try {
        const favorites = await Favorite.findById(req.params.id);
        if (favorites == null) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        if (req.body.course_id != null) {
            favorites.course_id = req.body.course_id;
        }
        if (req.body.user_id != null) {
            favorites.user_id = req.body.user_id;
        }

        const updatedFavorite = await favorites.save();
        res.json(updatedFavorite);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteFavoriteCourses = async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (favorite == null) {
            return res.status(404).json({ message: 'Favorite not found' });
        }

        await Favorite.findByIdAndDelete(req.params.id);
        res.json({ message: 'Favorite deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
