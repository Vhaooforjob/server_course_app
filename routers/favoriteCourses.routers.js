const express = require('express');
const router = express.Router();
const favController = require('../controllers/favoriteCourses.controllers');

router.get('/', favController.getFavoriteCourses);
router.get('/:id', favController.getFavoriteCoursesById);
router.get('/user/:id', favController.getFavoriteCoursesByUserId);
router.get('/course/:id', favController.getFavoriteCoursesByCourseId);
router.post('/',favController.createFavoriteCourses);
router.put('/:id', favController.updateFavoriteCourses);
router.delete('/:id', favController.deleteFavoriteCourses);
module.exports = router;