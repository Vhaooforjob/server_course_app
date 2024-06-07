const mongoose = require('mongoose');
const db = require('../configs/db');
const CourseModel = require('./courses.models');
const UserModel = require('./users.models');
const {Schema} = mongoose;

const FavoriteSchema = new Schema({
    course_id: { type: Schema.Types.ObjectId, ref: CourseModel.modelName, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: UserModel.modelName, required: true }
});

const FavoriteModel = db.model('Favorites', FavoriteSchema);
module.exports = FavoriteModel;