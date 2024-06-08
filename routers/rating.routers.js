const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/rating.controllers');

router.get('/',ratingController.getRating);
router.get('/:id',ratingController.getRatingById);
router.get('/course/:id',ratingController.getRatingByCourseId);
router.get('/user/:id',ratingController.getRatingByUserId);
router.post('/',ratingController.createRating);
router.put('/:id',ratingController.updateRating);
router.delete('/:id',ratingController.deleteRating);

module.exports = router;