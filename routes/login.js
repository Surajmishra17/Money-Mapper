const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('log')
});

router.post('/', async (req, res) => {
    const { email, password} = req.body;

    console.log('email:', email);
    console.log('Password:', password);

    res.send(`Logged in as ${email}`);
});

module.exports = router;
