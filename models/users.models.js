const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('./../configs/db')
const {Schema} = mongoose;

const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    full_name: { type: String, required: true },
    join_date: { type: Date, default: Date.now },
    image_url: { type: String }
});

UserSchema.pre('save', async function(){
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password,salt);

        user.password = hashpass;

    } catch (error) {
        throw error;
    }
});

UserSchema.methods.comparePassword = async function(userPassword){
    try {
        var user = this;
        const isMatch = await bcrypt.compare(userPassword, user.password);
        return isMatch;
    } catch (error) {
        throw error;
    }

}

const UserModel = db.model('User', UserSchema);

module.exports = UserModel;
