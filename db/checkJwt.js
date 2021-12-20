var jwt = require('jsonwebtoken');
const { client } = require('./connection');

const CheckUser = async (req, res, next) => {
    const auth = req.headers['authorization'];
    if (auth){
        var decoded = jwt.verify(auth, process.env.AUTH_KEY);
        if (decoded){
            client.query("SELECT * FROM users WHERE id = $1", [decoded], (err, result) => {
                if (err) {
                    res.send({
                        message: "Not Allowed to access this api"
                    });
                } else {
                    req.params['user_id'] = result.rows[0].id;
                    next();
                }
            })
        }else{
            res.send({
                message: "Provide Valid Auth token"
            });
        }
    }else{
        res.send({
            message: "Need Authorizations"
        });
    }
}

module.exports = {
    CheckUser
};