const jwt = require('jsonwebtoken');

function checkUser(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, "shhhhhhhhhh");
            res.locals.user = decoded; // pass to EJS
        } catch (err) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
}

module.exports = checkUser;
