const mongoose = require("mongoose");

var postSchema = mongoose.Schema(
    {
        content: {
            type: String,
            minLength: 10,
            required: true,
            unique: true,
            trim: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
            required: true,
        },
        reactions: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Reaction",
            },
        ],
        comments: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "comment",
            },
        ],
    },
    { timestamps: true }
);

var postsModel = mongoose.model("post", postSchema);
module.exports = postsModel;
