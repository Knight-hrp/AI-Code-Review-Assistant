const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const reviewController = require("../controllers/reviewController");


router.post("/", verifyToken, reviewController.createReview);
router.get("/", verifyToken, reviewController.getReviews);

module.exports = router;