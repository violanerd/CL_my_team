const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./db/connection');
const {getEmployees, getRole} = require('./queries');

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
        }]).then(data => {
            let activity = data.activity
            if (activity === 'View All Employees'){
                getEmployees();
            }
            if (activity === 'View All Roles'){
                getRole();
            }
            if (activity === 'Quit'){
                db.end();
            }
        });
    
}


getActivity();
