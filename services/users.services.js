const UserModel = require('./../models/users.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
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
    static async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded; // Return the decoded token data
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
    static async updateUser(userId, updateData) {
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }
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
        // Retrieve all users after verifying token
    static async getUsers(token) {
        try {
            const decoded = await this.verifyToken(token);
            if (!decoded) {
                throw new Error('Unauthorized access');
            }
            return await UserModel.find(); // Fetch all users if token is valid
        } catch (error) {
            throw error;
        }
    }

    // Retrieve a single user by ID after verifying token
    static async getUserById(token, userId) {
        try {
            const decoded = await this.verifyToken(token);
            if (!decoded) {
                throw new Error('Unauthorized access');
            }
            const user = await UserModel.findById(userId).populate('specialty', 'specialty_name _id');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}
module.exports = UserService;