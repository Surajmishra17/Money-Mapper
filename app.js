const express = require('express')
const app = express()
const path = require('path')
const login = require('./routes/login');
const signup = require('./routes/signup');
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/login', login);
app.use('/signup', signup);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
