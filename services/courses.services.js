const CourseCategory = require('../models/coursesCategory.models');
const User = require('../models/users.models');

class CousreService {
    static async validateCourse (categoryId, userId) {
        const category = await CourseCategory.findById(categoryId);
        const user = await User.findById(userId);
    
        if (!category) {
            throw new Error('Category does not exist');
        }
    
        if (!user) {
            throw new Error('User does not exist');
        }
    
        return true;
    };
}

module.exports = CousreService;