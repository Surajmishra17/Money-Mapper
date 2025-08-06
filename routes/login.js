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
    const { email, password} = req.body;
    let user = await userModel.findOne({ email: req.body.email })
    if (!user) return res.send("Something went wrong")

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: user.email }, "shhhhhhhhhh")
            res.cookie("token", token)
            res.send("yes you can login")
        }
        else res.send("Something is wrong")
    })
});

module.exports = router;
