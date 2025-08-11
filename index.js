require('dotenv').config();
const connectDatabase = require('./db/index.js');
const app = require('./app.js');


connectDatabase()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is listen at port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("Faildes connection", err);
});