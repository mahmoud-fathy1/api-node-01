const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authenticationMiddleware");

router.get("/", auth, postController.getAllPosts);
router.get("/:id", auth, postController.getPostById);
router.post("/", auth, postController.savePost);
router.patch("/:id", auth, postController.updatePost);
router.delete("/:id", auth, postController.deletePost);

module.exports = router;
