const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');
const [allEmployees, allRoles, allDepartments, viewByManager, viewByDepartment, viewBudget, insertDepartment, insertRole] = require('./queries');


const choices = ['View All Employees', 
'View All Employees By Department',
'View All Employees By Manager', 
'Add Employee',
'Remove Employee',
'Update Employee Role',
'Update Employee Manager',
'View All Roles',
'Add Role',
'View All Departments',
'Add Department',
'Remove Department',
'View Total Uitlized Budget By Department',
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
    let sql = ''; // should change this to default 
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
                default: 'Restaurant'
                    }]).then(({ departmentName }) => {
                        let params = [departmentName];
                        queryDbwithEdits(sql, params);
                    });
            break;    
        case 'Add Role':
            sql = insertRole;
            getDept();  
            break;
        // case 'Remove Department':    
        // case 'Remove Employee':
        // case 'Update Employee Role':
        // case 'Update Employee Manager':
        // case 'Add Employee'
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
    console.table(rows);
    getActivity();
    })
};



const sql1 = `SELECT name, id AS value FROM department`;
//working choices array w/inquirer
function getArray(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql1, (err,res) => {
            if (err){
                return reject(err);
            }
            resolve(res); 
        })
    })
}

async function getDept () {
    let params = [];
    let choices = await getArray(sql1);
    inquirer.prompt([{
        type: 'text',
        name: 'roleName',
        message: "What is the name of the role?",
        default: 'Server'
        },
        {
        type: 'number',
        name: 'salary',
        message: "What is the salary of the role?",
        default: '25000'
        },
        {
        type: 'list',
        name: 'department',
        message: "What department does the role belong to?",
        choices: choices
    }])
    .then(({ roleName, salary, department }) => {
        params.push(roleName, salary, department); 
        console.log('params', params); 
        return(params);
    }).then( params => queryDbwithEdits(insertRole, params))
    }


getActivity();
