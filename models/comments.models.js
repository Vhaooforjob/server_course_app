const mongoose = require('mongoose');
const EpisodeModel = require('./episode.models');
const UserModel = require('./users.models');
const db = require('./../configs/db');
const {Schema} = mongoose;

const CommentsSchema = new Schema({
    review: { type: String },
    rating_date: { type: Date, default: Date.now},
    episode_id: { type: Schema.Types.ObjectId, ref: EpisodeModel.modelName, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: UserModel.modelName, required: true }
    
});

const CommentsModel = db.model('Comments', CommentsSchema);
module.exports = CommentsModel;