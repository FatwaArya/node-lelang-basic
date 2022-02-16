//create database connection to lelang using mysql
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node-lelang',
    multipleStatements: true

});

//export connection
module.exports = db;