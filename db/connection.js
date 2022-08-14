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


// db.connect(err => {
//     if (err) throw err;
//     console.log('Database connected.');
// });

// working promise connection
// function getDeptArray() {
//     db.promise().query(`SELECT name, id AS value FROM department;`)
//     .then(([rows]) => {
//         console.log(rows);
//     })
//     .catch(console.log)
//     .then( () => db.end());
// }

// ----working choices array w/inquirer
// const sql1 = `SELECT name, id AS value FROM department`;

// function getDeptArray(sql) {
//     return new Promise((resolve, reject) => {
//         db.query(sql1, (err,res) => {
//             if (err){
//                 return reject(err);
//             }
//             resolve(res); 
//         })
//     })
// }


// async function getDept () {
//     let params = [];
//     let choices = await getDeptArray();
//     inquirer.prompt([{
//         type: 'text',
//         name: 'roleName',
//         message: "What is the name of the role?",
//         default: 'Server'
//         },
//         {
//         type: 'number',
//         name: 'salary',
//         message: "What is the salary of the role?",
//         default: '25000'
//         },
//         {
//         type: 'list',
//         name: 'department',
//         message: "What department does the role belong to?",
//         choices: choices
//     }])
//     .then(({ roleName, salary, department }) => {
//         params.push(roleName, salary, department); 
//         console.log('params', params); 
//     })
// }
// getDept();   