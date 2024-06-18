const CourseModel = require('../models/courses.models');
const UserModel = require('../models/users.models');

exports.searchCourses = async (req, res) => {
    const { query } = req.query;
    try {
        const courses = await CourseModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        })
        .sort({ creation_date: -1 }) 
        .limit(5) 
        .populate('category_id', 'name')
        .populate('user_id', 'username full_name');
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchUsers = async (req, res) => {
    const { query } = req.query;

    try {
        const users = await UserModel.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { full_name: { $regex: query, $options: 'i' } }
            ]
        }).populate('specialty').select('-password -_id').limit(5).sort({ join_date: -1 });

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchReq = async (req, res) => {
    const { query } = req.query;
    try {
        const users = await UserModel.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { full_name: { $regex: query, $options: 'i' } }
            ]
        })
        .populate('specialty')
        .select('-password')
        .limit(5)
        .sort({ join_date: -1 });

        const courses = await CourseModel.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ]
        })
        .limit(5)
        .sort({ creation_date: -1 }) 
        .populate('category_id', 'category_name -_id')
        .populate('user_id', 'username full_name');
        
        const searchData = { users, courses };
        res.json(searchData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// exports.searchFilters = async (req, res) => {
//     const { query, minRating, maxRating, categoryId, sortBy } = req.query;
//     const ratingsFilter = {};
//     if (minRating && maxRating) {
//         ratingsFilter.score = { $gte: parseInt(minRating), $lte: parseInt(maxRating) };
//     } else if (minRating) {
//         ratingsFilter.score = { $gte: parseInt(minRating) };
//     } else if (maxRating) {
//         ratingsFilter.score = { $lte: parseInt(maxRating) };
//     }

//     const categoryFilter = categoryId ? { category_id: categoryId } : {};

//     try {
//         const users = await UserModel.find({
//             $or: [
//                 { username: { $regex: query, $options: 'i' } },
//                 { full_name: { $regex: query, $options: 'i' } }
//             ]
//         })
//         .populate('specialty')
//         .select('-password -_id')
//         .limit(5)
//         .sort({ join_date: sortBy === 'asc' ? 1 : -1 });

//         const courses = await CourseModel.find({
//             $or: [
//                 { title: { $regex: query, $options: 'i' } },
//                 { description: { $regex: query, $options: 'i' } }
//             ],
//             ...categoryFilter
//         })
//         .limit(5)
//         .sort({ creation_date: sortBy === 'asc' ? 1 : -1 }) 
//         .populate('category_id', 'name')
//         .populate('user_id', 'username full_name')
//         .populate({
//             path: 'ratings',
//             match: ratingsFilter,
//             options: { sort: { rating_date: sortBy === 'asc' ? 1 : -1 }, limit: 5 }
//         });
//         const searchData = { users, courses };

//         res.json(searchData);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };
