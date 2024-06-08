const mongoose = require('mongoose');
const CourseModel = require('./courses.models');
const UserModel = require('./users.models');
const db = require('./../configs/db');
const {Schema} = mongoose;

const RatingSchema = new Schema({
    score : { type: Number, required: true },
    review: { type: String },
    rating_date: { type: Date, default: Date.now},
    course_id: { type: Schema.Types.ObjectId, ref: CourseModel.modelName, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: UserModel.modelName, required: true }
});

const RatingModel = db.model('Ratings', RatingSchema);
module.exports = RatingModel;