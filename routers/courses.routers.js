const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courses.controllers');

router.get('/', CourseController.getCourses);
router.get('/paginated', CourseController.getCoursesLimit);
router.get('/getAllCourses', CourseController.getAllCourses);
router.get('/getListCourses', CourseController.getListCourses);
router.get('/:id', CourseController.getCourseById);
router.get('/user/:id',CourseController.getCourseByUserId);
router.get('/category/:id',CourseController.getCourseByCateId);
router.post('/', CourseController.createCourse);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

module.exports = router;
