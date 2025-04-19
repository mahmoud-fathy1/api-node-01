const express = require("express");
const router = express.Router();
const reactionController = require("../controllers/reactionController");
const auth = require("../middlewares/authenticationMiddleware");

// router.get("/", auth, reactionController.getAllReaction);
router.post("/", auth, reactionController.saveReaction);
router.get("/:id", auth, reactionController.getReactionById);
router.get("/userRoutes/:id", auth, reactionController.getUserReactionById);
router.patch("/:id", auth, reactionController.updateReactionById);
router.delete("/:id", auth, reactionController.deleteReactionById);

module.exports = router;
// git hub comment marwa
