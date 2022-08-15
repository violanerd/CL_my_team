const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');
const [allEmployees, allRoles, allDepartments, viewByManager, viewByDepartment, viewBudget, insertDepartment, insertRole, insertEmployee, updateEmployeeRole, removeADepartment, removeARole,
    removeAnEmployee] = require('./queries');


const choices = ['View All Employees',
'View All Employees By Department',
'View All Employees By Manager',
'View All Roles', 
'View All Departments',
'View Total Uitlized Budget By Department', 
'Add Department',
'Add Role',
'Add Employee',
'Update Employee Role',
'Remove Employee',
'Remove Role',
'Remove Department',
'Quit'];

function getActivity () {
    inquirer.prompt([{
        type: 'list',
        name: 'activity',
        message: "What would you like to do?",
        choices: choices
        }]).then(({ activity }) => {
            if (activity === 'Quit'){
                console.log("Thanks for using the application!");
                return db.end();
            }
            else{
                figureOutQuery(activity);
            }
        });
}


function figureOutQuery(activity) {
    let sql = ''; 
    switch(activity){
        case 'View All Employees':
            queryDbwithResults(allEmployees);
            break;
        case 'View All Roles':
            queryDbwithResults(allRoles);
            break;
        case 'View All Employees By Department':
            queryDbwithResults(viewByDepartment);
            break;
        case 'View All Employees By Manager': 
            queryDbwithResults(viewByManager);
            break;
        case 'View All Departments':
            queryDbwithResults(allDepartments);
            break;
        case 'View Total Uitlized Budget By Department':
            queryDbwithResults(viewBudget);
            break;
        case 'Add Department':
            sql = insertDepartment;
            inquirer.prompt([{
                type: 'text',
                name: 'departmentName',
                message: "What is the name of the department?",
                    }]).then(({ departmentName }) => {
                        let params = [departmentName];
                        queryDbwithEdits(sql, params);
                    });
            break;    
        case 'Add Role':
            getNewDept();  
            break;
        case 'Add Employee':
            getNewEmployee();
            break;
        case 'Update Employee Role':
            getNewEmployeeRole();
            break;
        case 'Remove Department':
            removeDepartment();
            break;    
        case 'Remove Employee':
            removeEmployee();
            break;
        case 'Remove Role':
            removeRole();
            break;
        default:
            console.log('Unable to find activity');
            db.end();
    }
}

function queryDbwithResults(sql) {
    db.query(sql, (err, rows) => {
    if (err) {
        console.log(err.message);
    }
    console.table(rows);
    getActivity();
    })
};

function queryDbwithEdits(sql, params) {
    db.query(sql, params, (err, rows) => {
    if (err) {
        console.log(err.message);
    }
    getActivity();
    })
};


// gets departments as data I can use in inquirer
const sql1 = `SELECT name, id AS value FROM department`;
// gets roles as data I can use in inquirer
const sql2 = `SELECT role.title AS name, role.id AS value FROM role JOIN department ON role.department_id = department.id`;
//gets employees (managers) as data I can use in inquirer
const sql3 = `SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS name, employee.id AS value
FROM employee`;

// promise db query to work with inquirer
function getArray(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err,res) => {
            if (err){
                return reject(err);
            }
            resolve(res); 
        })
    })
}

async function getNewDept () {
    let params = [];
    let choices = await getArray(sql1);
    inquirer.prompt([{
        type: 'text',
        name: 'roleName',
        message: "What is the name of the role?",
        },
        {
        type: 'number',
        name: 'salary',
        message: "What is the salary of the role?",
        },
        {
        type: 'list',
        name: 'department',
        message: "What department does the role belong to?",
        choices: choices
    }])
    .then(({ roleName, salary, department }) => {
        params.push(roleName, salary, department);
        return(params);
    }).then(params => queryDbwithEdits(insertRole, params))
}


async function getNewEmployee () {
    let params = [];
    let roles = await getArray(sql2);
    let managers = await getArray(sql3);
    managers.push({name: 'None', value: null });
    inquirer.prompt([
        {
            type: 'text',
            name: 'firstName',
            message: "What is the employee's first name?",
        },
        {
            type: 'text',
            name: 'lastName',
            message: "What is the employee's last name?",
        },
        {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roles // an array of roles
        },
        {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: managers // an array of employees plus None val NULL
        }
    ]).then(({ firstName, lastName, role, manager }) => {
        params.push(firstName, lastName, role, manager); 
        return(params);
    }).then(params => queryDbwithEdits(insertEmployee, params))
}

async function getNewEmployeeRole () {
    let params = [];
    let roles = await getArray(sql2);
    let employees = await getArray(sql3);
    inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: "Which employee's role do you want to update?",
            choices: employees
        },
        {
            type: 'list',
            name: 'role',
            message: "Which role do you want to assign the selected employee?",
            choices: roles // an array of roles
        }
    ]).then(({ employee, role }) => {
        params.push(role, employee); 
        return(params);
    }).then(params => queryDbwithEdits(updateEmployeeRole, params))
}

async function removeDepartment () {
    let params = [];
    let choices = await getArray(sql1);
    inquirer.prompt([
        {
        type: 'list',
        name: 'department',
        message: "What department would you like to remove?",
        choices: choices
    }])
    .then(({ department }) => {
        params.push(department); 
        return(params);
    }).then(params => queryDbwithEdits(removeADepartment, params))
}
async function removeRole () {
    let params = [];
    let choices = await getArray(sql2);
    inquirer.prompt([
        {
        type: 'list',
        name: 'role',
        message: "What role would you like to remove?",
        choices: choices
    }])
    .then(({ role }) => {
        params.push(role); 
        return(params);
    }).then(params => queryDbwithEdits(removeARole, params))
}
async function removeEmployee () {
    let params = [];
    let choices = await getArray(sql3);
    inquirer.prompt([
        {
        type: 'list',
        name: 'employee',
        message: "What employee would you like to remove?",
        choices: choices
    }])
    .then(({ employee }) => {
        params.push(employee); 
        return(params);
    }).then(params => queryDbwithEdits(removeAnEmployee, params))
}


getActivity();
