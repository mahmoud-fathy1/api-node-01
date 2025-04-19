const express = require("express");
const router = express.Router();
const userProfileController = require("../controllers/profileController");
const auth = require("../middlewares/authenticationMiddleware");

router.post("/", auth, userProfileController.saveProfile);
router.get("/", auth, userProfileController.getProfileById);
router.patch("/", auth, userProfileController.updateProfile);

module.exports = router;
