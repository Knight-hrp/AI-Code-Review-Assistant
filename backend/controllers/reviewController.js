const reviewService = require("../services/reviewService");
const aiService = require("../services/aiService");

const createReview = async (req, res) => {
    try {
        const { title, language, code } = req.body;
        const userId = req.user.id;

        // Ask Gemini to review the code
        const aiResponse = await aiService.reviewCode(
            code,
            language
        );

        // Remove markdown if Gemini returns ```json
        const cleanedResponse = aiResponse
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const reviewOutput = JSON.parse(cleanedResponse);

        // Save review in database
        const review = await reviewService.createReview(
            userId,
            title,
            language,
            code,
            reviewOutput
        );

        return res.status(201).json({
            message: "Review created successfully",
            review,
        });

    } catch (error) {
        console.error("Create Review Error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const userId = req.user.id;

        const reviews = await reviewService.getReviewsByUser(userId);

        return res.status(200).json(reviews);

    } catch (error) {
        console.error("Get Reviews Error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const getReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.id;

        const review = await reviewService.getReviewById(
            reviewId,
            userId
        );

        if (!review) {
            return res.status(404).json({
                message: "Review not found",
            });
        }

        return res.status(200).json(review);

    } catch (error) {
        console.error("Get Review Error:", error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    createReview,
    getReviews,
    getReviewById,
};