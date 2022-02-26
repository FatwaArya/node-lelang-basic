//create database connection to lelang using mysql
// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'node-lelang',
//     multipleStatements: true

// });

//create database connection to lelang using sequelize
const sequelize = require('sequelize');
const db = new sequelize('node-lelang', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    , logging: false
});


//export connection
module.exports = db;