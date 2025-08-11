const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

module.exports = async function(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, "shhhhhhhhhh");
        req.user = await userModel.findOne({ email: decoded.email }).select("-password");
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};
