const User = require('./../models/users.models');
const UserService = require('./../services/users.services');

exports.registerUser = async (req, res) => {
    try {
        const { email, username, password, full_name } = req.body;

        const emailExists = await UserService.checkEmailUser(email);
        if (emailExists) {
            return res.status(400).json({ status: false, message: "Email already in use" });
        }

        const usernameExists = await UserService.checkUsernameUser(username);
        if (usernameExists) {
            return res.status(400).json({ status: false, message: "Username already in use" });
        }

        await UserService.registerUser(email, username, password, full_name);
        res.json({ status: true, message: "User registered successfully!" });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};


exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.checkEmailUser(email);
        
        if (!user) {
            return res.status(400).json({ status: false, message: "User does not exist" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Password is incorrect" });
        }

        const tokenData = { _id: user._id, email: user.email };
        // const token = await UserService.generateToken(tokenData, "secretKey", "1h");
        const token = await UserService.generateToken(tokenData, process.env.JWT_SECRET, process.env.JWT_EXPIRE);

        res.status(200).json({ status: true, token: token });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.deleteUser(userId);

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        res.json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};