const db = require('./db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');


function getEmployees() {
    db.query(`SELECT e.id AS employee_id, e.first_name, e.last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, CASE 
WHEN e.manager_id IS NULL THEN 'no manager' ELSE CONCAT(m.first_name,' ', m.last_name) END AS manager
FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id;`, (err, rows) => {
    if (err) {
        console.log(err.message);
    }
    console.table(rows);
})
};

function getRole() {
    db.query(`SELECT role.id AS role_id, role.title AS job_title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;`, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.table(rows);
    })
};



inquirer.prompt([{
    type: 'list',
    name: 'whatToDo',
    message: "What would you like to do?",
    choices: ['display employees', 'display roles']
    }]).then(data => {
        if (data.whatToDo === 'display employees'){
            getEmployees();
        }
        if (data.whatToDo === 'display roles'){
            getRole();
        }
    })
