const express = require('express');
const router = express.Router();
const CourseCategory = require('../controllers/coursesCategory.controllers');

router.get('/', CourseCategory.getCoursesCategory);
router.post('/',CourseCategory.createCoursesCategory);
router.put('/:id', CourseCategory.updateCoursesCategory);
router.delete('/:id', CourseCategory.deleteCoursesCategory);
module.exports = router;