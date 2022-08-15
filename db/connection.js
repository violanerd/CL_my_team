const mysql = require('mysql2');
const p = require('./helpers');
const inquirer = require('inquirer');
//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MYSQL password
        password: p, // enter your password here
        database: 'myteam'
    }
);
   

module.exports = db;

