const mongoose = require('mongoose');
const db = require('./../configs/db');
const CourseCategoryModel = require('./coursesCategory.models');
const UserModel = require('./../models/users.models');
const {Schema} = mongoose;

const CourseSchema = Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    image_url: { type: String, required: true },
    category_id: { type: Schema.Types.ObjectId, ref: CourseCategoryModel.modelName, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: UserModel.modelName, required: true }
});

const CourseModel = db.model('Courses', CourseSchema);
module.exports = CourseModel;
