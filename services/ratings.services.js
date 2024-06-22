const RatingModel = require('../models/rating.models');
const CoursesModel = require('../models/courses.models');

class RatingService {
    async createRating({ user_id, course_id, score, review }) {
        if (score < 1 || score > 5) {
            throw new Error('Rating score must be between 1 and 5');
        }

        const course = await CoursesModel.findById(course_id);
        if (!course) {
            throw new Error('Course not found');
        }
        
        if (course.user_id.toString() === user_id) {
            throw new Error('User cannot rate their own course');
        }

        const existingRating = await RatingModel.findOne({ user_id, course_id });
        if (existingRating) {
            throw new Error('User has already rated this course');
        }

        const rating = new RatingModel({ user_id, course_id, score, review });
        const newRating = await rating.save();
        return newRating;
    }
}

module.exports = new RatingService();
