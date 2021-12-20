const { client } = require('../db/connection');

module.exports.createContacts = async function (params, callback) {
    const { user_id, phone_numbers } = params;

    client.query(
        "INSERT INTO users_emergency_contacts (user_id, phone_numbers, created_at) VALUES ($1, $2, $3) RETURNING id, user_id, phone_numbers, created_at",
        [user_id, phone_numbers, new Date()],
        (error, result) => {
            console.log('users_emergency_contacts create', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};

module.exports.getContacts = async function (params, callback) {
    client.query("SELECT * FROM users_emergency_contacts", (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    })
};

module.exports.getContactsByUserId = async function (params, callback) {
    const { user_id } = params;

    client.query("SELECT * FROM users_emergency_contacts WHERE user_id = $1", [user_id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows[0]);
        }
    })
};

module.exports.updateContacts = async function (params, callback) {
    const { phone_numbers, user_id } = params;

    client.query(
        "UPDATE users_emergency_contacts SET phone_numbers = $2 WHERE user_id = $1 RETURNING id, user_id, phone_numbers",
        [user_id, phone_numbers ],
        (error, result) => {
            console.log('updateContacts update', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};
