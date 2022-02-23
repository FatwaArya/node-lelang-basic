const express = require('express');
const db = require('./db/lelang');
require('dotenv').config()
const app = express();
const port = 3000;
app.use(express.json());
//connect to db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Mysql Connected...');
});
//mount app.use to barang
app.use('/barang', require('./routes/barang.router'));
//mount app.use to user
app.use('/user', require('./routes/user.router'));
//mount app.use to bid
app.use('/bid', require('./routes/bidding.router'));

app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});


