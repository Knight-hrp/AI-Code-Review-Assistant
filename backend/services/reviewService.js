const pool = require("../config/db");

const createReview = async (
    userId,
    title,
    language,
    code,
    reviewOutput
) => {

    const result = await pool.query(
        `
        INSERT INTO reviews
        (user_id,title,language,code,review_output)
        VALUES($1,$2,$3,$4,$5)
        RETURNING *
        `,
        [
            userId,
            title,
            language,
            code,
            reviewOutput,
        ]
    );

    return result.rows[0];
};

const getReviewsByUser = async (userId) => {

    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE user_id=$1
        ORDER BY created_at DESC
        `,
        [userId]
    );

    return result.rows;
};

const getReviewById = async (
    reviewId,
    userId
) => {

    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE id=$1 AND user_id=$2
        `,
        [reviewId, userId]
    );

    return result.rows[0];
};

module.exports = {
    createReview,
    getReviewsByUser,
    getReviewById,
};