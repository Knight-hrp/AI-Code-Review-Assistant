const pool = require("../config/db");


const createReview = async (userId,
    title,
    language,
    code,
    reviewOutput) => {

    const result = await pool.query(
        `
    INSERT INTO reviews
    (user_id, title, language, code, review_output)
    VALUES ($1,$2,$3,$4,$5)
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
}

module.exports = {
    createReview,
};
