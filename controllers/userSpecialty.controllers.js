const SpecialtyModel = require('../models/userSpecialty.models');
const User = require('../models/users.models');

exports.getSpecialty = async (req, res) => {
    try {
        const specialty = await SpecialtyModel.find();
        res.json(specialty);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getSpecialtyById = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const specialty = await SpecialtyModel.findById(specialtyId);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        const users = await User.find({ specialty: specialtyId }).select('_id full_name');

        res.json({ specialty, users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createSpecialty = async (req, res) => {
    const specialty = new SpecialtyModel(req.body);
    try {
        const newSpecialty = await specialty.save();
        res.status(201).json(newSpecialty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateSpecialty = async (req, res) => {
    try {
        const updatedSpecialty = await SpecialtyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedSpecialty);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSpecialty = async (req, res) => {
    try {
        const specialtyId = req.params.id;
        const specialty = await SpecialtyModel.findByIdAndDelete(specialtyId);

        if (!specialty) {
            return res.status(404).json({ status: false, message: "not found" });
        }

        res.json({ status: true, message: "deleted successfully" });
    } catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
};