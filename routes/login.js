const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user');
const cookieParser = require('cookie-parser');

router.use(cookieParser())

router.get('/', (req, res) => {
    res.render('log')
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send("Invalid credentials");

    // ✅ Create token
    const token = jwt.sign({ email: user.email }, "shhhhhhhhhh", { expiresIn: "1h" });

    // ✅ Set cookie and redirect
    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set true in production
        sameSite: 'strict'
    });

    res.redirect('/');
});

module.exports = router;
