const mongoose = require("mongoose");

const reactionSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "user",
            required: true,
            validate: {
                validator: (value) => mongoose.Types.ObjectId.isValid(value),
                message: "Invalid userId",
            },
        },
        // Either postId or commentId, not both
        postId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "post",
            validate: {
                validator: (value) => mongoose.Types.ObjectId.isValid(value),
                message: "Invalid postId",
            },
        },
        commentId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "comment",
            validate: {
                validator: (value) => mongoose.Types.ObjectId.isValid(value),
                message: "Invalid commentId",
            },
        },
        typeReaction: {
            type: String,
            enum: ["love", "like", "care", "angry", "cry", "wow"],
            required: true,
        },
    },
    { timestamps: true }
);

const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;
