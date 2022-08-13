const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');
const [allEmployees, allRoles, allDepartments, viewByManager, viewByDepartment, viewBudget] = require('./queries');


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
    switch(activity){
        case 'View All Employees':
            sql = allEmployees;
            break;
        case 'View All Roles':
            sql = allRoles;
            break;
        case 'View All Employees By Department':
            sql = viewByDepartment;
            break;
        case 'View All Employees By Manager': 
            sql = viewByManager;
            break;
        case 'View All Departments':
            sql = allDepartments;
            break;
        case 'View Total Uitlized Budget By Department':
            sql = viewBudget;
            break;
        // case 'Add Department':
        // case 'Remove Department':
        // case 'Add Employee':
        // case 'Remove Employee':
        // case 'Update Employee Role':
        // case 'Update Employee Manager':
        // case 'Add Role':
        // 
        default:
            console.log('Unable to find activity');
            db.end();
    }
    queryDbwithResults(sql);
}

function queryDbwithResults(sql) {
    db.query(sql, (err, rows) => {//input selected sql
    if (err) {
        console.log(err.message);
    }
    console.table(rows);
    getActivity();
    })
};

getActivity();
