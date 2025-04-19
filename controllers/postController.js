const postsModel = require("../models/post");

async function getAllPosts(req, res) {
    const userId = req.id;

    // Pagination: Get limit and skip from query parameters
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    let query = postsModel.find();

    if (userId) {
        query = postsModel.find({ userId: userId });
    }

    try {
        const totalCount = await postsModel.countDocuments(query);

        const paginatedPosts = await query
            .populate({
                path: "userId",
                select: "fullName",
                model: "user",
            })
            .select("-userId")
            .skip(skip)
            .limit(limit)
            .exec();

        // Apply any additional filtering here based on query parameters (if needed)

        res.status(200).json({ paginatedPosts, totalCount });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving posts", error: error.message });
    }
}

//get post by id
function getPostById(req, res) {
    const postId = req.params.id;
    postsModel
        .findById(postId)
        .populate({
            path: "userId",
            model: "user",
        })
        .then((post) => {
            if (!post) {
                return res.status(404).json({ message: "Post not found" });
            }

            const reactionsCount = post.reactions ? post.reactions.length : 0;
            const commentsCount = post.comments ? post.comments.length : 0;

            const postDetails = {
                _id: post._id,
                content: post.content,
                username: post.userId.username,
                reactionsCount: reactionsCount,
                commentsCount: commentsCount,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };

            return res.status(200).json({ postDetails });
        })
        .catch((error) => res.status(500).json({ message: "Error retrieving post", error: error.message }));
}

function savePost(req, res) {
    const post = req.body;
    post.userId = req.userId;
    post.reactions = [];
    post.comments = [];

    postsModel
        .create(post)
        .then((newPost) => res.status(201).json({ newPost }))
        .catch((error) => res.status(500).json({ message: "Error creating post", error: error.message }));
}

function updatePost(req, res) {
    const postId = req.params.id;
    const content = req.body.content;
    postsModel
        .findByIdAndUpdate(postId, { content: content }, { new: true })
        .then((updatedPost) => {
            if (updatedPost) {
                res.status(200).json({ updatedPost });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: "Error updating post", error: error.message }));
}

function deletePost(req, res) {
    const postId = req.params.id;
    postsModel
        .findByIdAndDelete(postId)
        .then((deletedPost) => {
            if (deletedPost) {
                res.status(200).json({ deletedPost });
            } else {
                res.status(404).json({ message: "Post not found" });
            }
        })
        .catch((error) => res.status(500).json({ message: "Error deleting post", error: error.message }));
}

module.exports = { getAllPosts, getPostById, savePost, updatePost, deletePost };
