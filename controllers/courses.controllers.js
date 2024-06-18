const Courses = require('../models/courses.models');
const User = require('../models/users.models');
const Category = require('../models/coursesCategory.models');
const Episodes = require('../models/episode.models');
const CousreService = require('../services/courses.services');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Courses.find().populate('category_id').populate('user_id','username full_name');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCoursesLimit = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const courses = await Courses.find()
            .populate('category_id')
            .populate('user_id','username full_name')
            .skip(skip)
            .limit(limit);

        const totalCourses = await Courses.countDocuments();
        const totalPages = Math.ceil(totalCourses / limit);
        const startCourse = skip + 1;
        const endCourse = Math.min(skip + limit, totalCourses);

        res.json({
            page,
            totalPages,
            startCourse,
            endCourse,
            totalCourses,
            courses
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Courses.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getListCourses = async (req, res) => {
    try {
        const courses = await Courses.find().populate('category_id').lean();
        const coursesWithEpisodes = await Promise.all(courses.map(async (course) => {
            const episodes = await Episodes.find({ course_id: course._id });
            return { ...course, episodes };
        }));

        res.json(coursesWithEpisodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Courses.findById(req.params.id).populate('category_id').populate('user_id', 'full_name _id').lean();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const episodes = await Episodes.find({ course_id: course._id });
        res.json({ ...course, episodes });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCourseByUserId = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean();
        if (!user) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const course = await Courses.find({ 'user_id': user._id }).lean();
        const count = course.length;
        res.json({ ...user,count, course});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getCourseByCateId = async (req, res) => {
    try {
        const cate = await Category.findById(req.params.id).lean();
        if (!cate) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const course = await Courses.find({ 'category_id': cate._id }).lean();
        const count = course.length;
        res.json({ ...cate,count, course});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createCourse = async (req, res) => {
    try {
        await CousreService.validateCourse(req.body.category_id, req.body.user_id);

        const course = new Courses(req.body);
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        await CousreService.validateCourse(req.body.category_id, req.body.user_id);

        const updatedCourse = await Courses.findByIdAndUpdate(courseId, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(updatedCourse);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const deletedCourse = await Courses.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};