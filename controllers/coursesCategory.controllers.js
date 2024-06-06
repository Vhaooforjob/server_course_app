const CourseCategory = require('../models/coursesCategory.models');

exports.getCoursesCategory = async (req, res) => {
    try {
        const coursesCategory = await CourseCategory.find();
        res.json(coursesCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCoursesCategory = async (req, res) => {
    const coursesCategory = new CourseCategory(req.body);
    try {
        const newcoursesCategory = await coursesCategory.save();
        res.status(201).json(newcoursesCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCoursesCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const updatedCategory = await CourseCategory.findByIdAndUpdate(categoryId, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCoursesCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await CourseCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
