const UserModel = require('./../models/users.models');
const jwt = require('jsonwebtoken')

class UserService{
    static async registerUser(email, username, password, full_name) {
        try {
            const user = new UserModel({ email, username, password, full_name });
            return await user.save();
        } catch (error) {
            throw error;
        }
    }
    
    static async checkEmailUser(email){
        try{
            const user = await UserModel.findOne({email});
            return user;
        }catch(err){
            throw err;
        }
    }
    static async checkUsernameUser(username){
        try{
            const user = await UserModel.findOne({username});
            return user;
        }catch(err){
            throw err;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        try{
            return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
        }catch(err){
            throw err;
        }
    }
    static async updateUser(userId, updateData) {
        try {
            return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
        } catch (error) {
            throw error;
        }
    }
    static async deleteUser(userId) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            throw error;
        }
    }
}
module.exports = UserService;