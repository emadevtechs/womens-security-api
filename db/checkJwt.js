var jwt = require('jsonwebtoken');
const { client } = require('./connection');

module.exports.CheckUser = async function (req, res, next) {
    const auth = req.headers['authorization'];
    if (auth) {
        try {
            var decoded = jwt.verify(auth, process.env.AUTH_KEY);
            if (decoded) {
                client.query("SELECT * FROM users WHERE id = $1", [decoded], (err, result) => {
                    if (err) {
                        res.send({
                            message: "Not Allowed to access this api"
                        });
                    } else if (result && result.rows && result.rows[0]) {
                        req.params['user_id'] = result.rows[0].id;
                        next();
                    } else {
                        res.send({
                            message: "No user found on this credential"
                        });
                    }
                })
            } else {
                res.send({
                    message: "Provide Valid Auth token"
                });
            }
        } catch (error) {
            res.send({
                message: error.message
            });
        }
    } else {
        res.send({
            message: "Need Authorizations"
        });
    }
}