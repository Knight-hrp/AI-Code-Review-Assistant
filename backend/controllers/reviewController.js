const reviewModel = require("../models/reviewModel");
const reviewService = require("../services/reviewService");

const createReview = async (req, res) => {
    try {
        const { language, code, title, review_output } = req.body;
        const userId = req.user.id;

        const reviewOutput = {
            summary: "Analysis completed successfully.",
            score: 90,
            bugs: [],
            suggestions: [
                "Use meaningful variable names.",
                "Add comments where necessary."
            ]
        };
        const review = await reviewModel.createReview(
            userId,
            title,
            language,
            code,
            reviewOutput
        );
        res.status(201).json({
            message: "Review created successfully",
            review,
        });
    }
    catch (err) {
        console.log("Internal Server Error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getReviews = async (req, res) => {
    try {
        const userId = req.user.id;

        const reviews = await reviewService.getReviewsByUser(userId);

        res.status(200).json(reviews);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

const getReviewById = async (reviewId, userId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE id = $1 AND user_id = $2
        `,
        [reviewId, userId]
    );

    return result.rows[0];
};


module.exports = {
    createReview,
    getReviews,
    getReviewById,
};
