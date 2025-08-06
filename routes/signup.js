const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require("../models/user")

router.get('/', (req, res) => {
    res.render('sign')
});

router.post('/', async(req, res) => {
    const { email, password, confirmpassword } = req.body;
    if(password!==confirmpassword) res.send("Something went wrong")
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                email,
                password: hash,
            })

            let token = jwt.sign({ email }, "shhhhhhhhhh")
            res.cookie("token", token)

            res.send(createdUser)
        })
    })
});

module.exports = router;
