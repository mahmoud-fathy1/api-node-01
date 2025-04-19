const mongoose = require("mongoose");


//  schema for comments 

const commentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
        },
        postId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "post",
        },
        reactions: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: "Reaction",
            },
        ],
    },
    {
        timestamps: true,
    }
);

commentSchema.path("userId").validate(function (value) {
    return mongoose.Types.ObjectId.isValid(value);
}, "Invalid userId");

commentSchema.path("postId").validate(function (value) {
    return mongoose.Types.ObjectId.isValid(value);
}, "Invalid postId");

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
