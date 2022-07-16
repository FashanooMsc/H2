const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_uid) {
    const payload = {
        user: user_uid
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr" })
}

module.exports = jwtGenerator