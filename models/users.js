const { client } = require('../db/connection');

module.exports.createUser = async function (params, callback) {
    const { name, email, password, phone_number } = params;

    client.query(
        "INSERT INTO users (name, email, password, phone_number, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, password, phone_number, created_at",
        [name, email, password, phone_number, new Date(), new Date()],
        (error, result) => {
            console.log('user create', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};

module.exports.getUsers = async function (params, callback) {
    client.query("SELECT * FROM users", (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows);
        }
    })
};

module.exports.getUser = async function (params, callback) {
    const { id } = params;

    client.query("SELECT * FROM users WHERE id = $1", [id], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result.rows[0]);
        }
    })
};

module.exports.updateUser = async function (params, callback) {
    const { name, id } = params;

    client.query(
        "UPDATE users SET name = $2, updated_at = $3  WHERE id = $1 RETURNING id, name, email, password, phone_number",
        [id, name, new Date()],
        (error, result) => {
            console.log('user update', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};

module.exports.updateUserPassword = async function (params, callback) {
    const { password, id } = params;
    console.log("password,,,,,,,", id, password);
    client.query(
        "UPDATE users SET password = $2, updated_at = $3 WHERE id = $1 RETURNING id, name, email, password, phone_number",
        [id, password, new Date()],
        (error, result) => {
            console.log('user password update', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};

module.exports.deleteUser = async function (params, callback) {
    const { id } = params;

    client.query(
        "DELETE FROM users WHERE id = $1 RETURNING id",
        [id],
        (error, result) => {
            console.log('delete user', error, result)
            if (error) {
                callback(error, null);
            } else {
                callback(error, result.rows[0]);
            }
            // client.end();
        }
    );
};