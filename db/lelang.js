//create database connection to lelang using mysql
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-lelang'
});

//export connection
module.exports = db;