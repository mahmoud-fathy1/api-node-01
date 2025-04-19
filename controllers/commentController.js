const commentModel = require("../models/comment");
// comment githup

async function createComment(req, res) {
    const { content, postId } = req.body;
    const userId = req.userId;

    try {
        const newComment = await commentModel.create({
            content,
            userId,
            postId,
        });

        res.status(201).json({ newComment });
    } catch (error) {
        res.status(500).json({ message: "Error creating comment", error: error.message });
    }
}

async function updateComment(req, res) {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const updatedComment = await commentModel.findByIdAndUpdate(id, { content: content }, { new: true });

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ updatedComment });
    } catch (error) {
        res.status(500).json({ message: "Error updating comment", error: error.message });
    }
}

async function deleteComment(req, res) {
    const { id } = req.params;
    try {
        const deletedComment = await commentModel.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error: error.message });
    }
}

module.exports = { createComment, updateComment, deleteComment };
