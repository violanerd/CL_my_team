const mysql = require('mysql2');
//connect to database

require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MYSQL password
        password: process.env.DB_PASSWORD, 
        database: 'myteam'
    }
);
   

module.exports = db;

