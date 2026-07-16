const pool = require("../config/db");

// Existing createReview() here...

const getReviewsByUser = async (userId) => {
    const result = await pool.query(
        `
    SELECT *
    FROM reviews
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
        [userId]
    );

    return result.rows;
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
    getReviewsByUser,
    getReviewById,
};