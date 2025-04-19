const userProfileModel = require("../models/userProfile");

async function saveProfile(req, res) {
    const { bio, profilePicture } = req.body;
    const userId = req.userId;

    try {
        const existingProfile = await userProfileModel.findOne({ userId });
        if (existingProfile) {
            const updatedProfile = await userProfileModel.findOneAndUpdate(
                { userId },
                { bio, profilePicture },
                { new: true }
            );
            return res.status(200).json({ data: updatedProfile });
        } else {
            const newProfile = await userProfileModel.create({
                userId,
                bio,
                profilePicture,
            });
            return res.status(201).json({ data: newProfile });
        }
    } catch (error) {
        return res.status(500).json({ errorMessage: error.message });
    }
}

async function getProfileById(req, res) {
    const userId = req.userId;
    try {
        const userProfile = await userProfileModel.findOne({ userId });
        if (userProfile) {
            res.status(200).json({ userProfile });
        } else {
            res.status(404).json({ message: "User profile not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateProfile(req, res) {
    const { bio, profilePicture } = req.body;
    const userId = req.userId;
    try {
        const updatedProfile = await userProfileModel.findOneAndUpdate({ userId }, { bio, profilePicture }, { new: true });
        res.status(200).json({ updatedProfile });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { saveProfile, getProfileById, updateProfile };
