const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
            required: true,
            unique: true,
        },
        bio: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const userProfileModel = mongoose.model("userProfile", userProfileSchema);

module.exports = userProfileModel;
