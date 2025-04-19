const reactionModel = require("../models/reaction");
const postsModel = require("../models/post");
const commentModel = require("../models/comment");

// async function getAllReaction(req, res) {
//     try {
//         const reactions = await reactionModel.find();
//         res.json({ reactions });
//     } catch (err) {
//         res.status(500).json({ message: "try again" });
//     }
// }

async function saveReaction(req, res) {
    const { postId, commentId, typeReaction } = req.body;
    const userId = req.userId;

    try {
        if (!postId && !commentId) {
            return res.status(400).json({ message: "Either postId or commentId must be provided" });
        }

        let newReaction;
        if (postId) {
            newReaction = await reactionModel.create({ postId, userId, typeReaction });
            const post = await postsModel.findById(postId);
            if (post) {
                post.reactions.push(newReaction._id);
                await post.save();
            }
        } else if (commentId) {
            newReaction = await reactionModel.create({ commentId, userId, typeReaction });
            const comment = await commentModel.findById(commentId);
            if (comment) {
                comment.reactions.push(newReaction._id);
                await comment.save();
            }
        }

        res.status(201).json({ newReaction, status: "done" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getReactionById(req, res) {
    const { id } = req.params;
    try {
        const reaction = await reactionModel.findOne({ _id: id });
        if (reaction) {
            res.status(200).json({ reaction });
        } else {
            res.status(404).json({ message: "Reaction not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUserReactionById(req, res) {
    const { id } = req.params;
    try {
        const reactions = await reactionModel.findOne({ userId: id });
        if (reactions) {
            res.status(200).json({ reactions });
        } else {
            res.status(404).json({ message: "No reactions found for the specified user" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateReactionById(req, res) {
    const { id } = req.params;
    const { typeReaction } = req.body;
    try {
        const updatedReaction = await reactionModel.findByIdAndUpdate(id, { typeReaction: typeReaction }, { new: true });
        if (updatedReaction) {
            res.status(200).json({ updatedReaction });
        } else {
            res.status(404).json({ message: "Reaction not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteReactionById(req, res) {
    const { id } = req.params;
    try {
        const deletedReaction = await reactionModel.findByIdAndDelete(id);
        if (deletedReaction) {
            res.status(200).json({ deletedReaction });
        } else {
            res.status(404).json({ message: "Reaction not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    saveReaction,
    getReactionById,
    getUserReactionById,
    updateReactionById,
    deleteReactionById,
};
