const mongoose = require('mongoose');
const db = require('./../configs/db');
const CourseModel = require('../models/courses.models');
const {Schema} = mongoose;

const EpisodeSchema = Schema({
    title: { type: String, required: true },
    image_url: { type: String, required: true },
    video_url: { type: String, required: true },
    duration: { type: Number, required: true },
    course_id: { type: Schema.Types.ObjectId, ref: CourseModel.modelName, required: true }
});

const EpisodesModel = db.model('Episodes', EpisodeSchema);
module.exports = EpisodesModel;
