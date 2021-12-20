const { client } = require('../db/connection');

module.exports.createQuestions = async function (params, callback) {
    const { user_id, question, answer } = params;

    client.query(
        "INSERT INTO verify_questions (user_id, question, answer, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, question, answer, created_at",
        [user_id, question, answer, new Date(), new Date()],
        (error, result) => {
            console.log('question create', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};

module.exports.getQuestions = async function (params, callback) {
    client.query("SELECT * FROM verify_questions", (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    })
};

module.exports.getUserQuestion = async function (params, callback) {
    const { user_id } = params;

    client.query("SELECT * FROM verify_questions WHERE user_id = $1", [user_id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    })
};

module.exports.updateQuestion = async function (params, callback) {
    const { user_id, question, answer } = params;

    client.query(
        "UPDATE verify_questions SET question = $2, answer = $3, updated_at = $4 WHERE user_id = $1 RETURNING id, user_id, question, answer",
        [user_id, question, answer, new Date()],
        (error, result) => {
            console.log('question update', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};

module.exports.deleteQuestion = async function (params, callback) {
    const { user_id } = params;

    client.query(
        "DELETE FROM verify_questions WHERE user_id = $1 RETURNING id",
        [user_id],
        (error, result) => {
            console.log('delete question', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};