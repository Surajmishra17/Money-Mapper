const express = require('express')
const app = express()
const path = require('path')
const login = require('./routes/login');
const signup = require('./routes/signup');
const receiptRoutes = require('./routes/receipt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require("./models/user");
const checkUser = require('./middleware/auth');
const cors = require('cors');
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(cors());
app.use(checkUser)

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/receipt',receiptRoutes);
app.use('/login', login);
app.use('/signup', signup);

app.get("/logout", (req, res) => {
    res.cookie("token", "")
    res.redirect("/")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
