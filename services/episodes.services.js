const CourseModel = require('../models/courses.models');

class EpisodeService{
    static async validateEpisode (courseId){
        const course = await CourseModel.findById(courseId);
        if (!course) {
            throw new Error('Course does not exist');
        }
        return true;
    };
}

module.exports = EpisodeService;