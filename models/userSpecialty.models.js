const mongoose = require('mongoose');
const db = require('./../configs/db');
const UserModel = require('./../models/users.models');
const {Schema} = mongoose;

const SpecialtySchema = new Schema({
    specialty_name: { type: String, required: true },
});

const SpecialtyModel = db.model('Specialty', SpecialtySchema);
module.exports = SpecialtyModel;
