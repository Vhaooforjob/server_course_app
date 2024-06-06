const mongoose = require('mongoose');
const db = require('./../configs/db')
const {Schema} = mongoose;

const CourseCategorySchema = new Schema({
    category_name: { type: String, required: true }
});

const CourseCategoryModel = db.model('CourseCategory', CourseCategorySchema);
module.exports = CourseCategoryModel;
