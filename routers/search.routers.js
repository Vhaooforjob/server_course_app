const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search.controllers');

router.get('/courses', searchController.searchCourses);
router.get('/users', searchController.searchUsers);
router.get('/', searchController.searchReq);
// router.get('/filters/', searchController.searchFilters);
module.exports = router;
