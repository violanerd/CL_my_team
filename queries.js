const db = require('./db/connection');

// rewrite this to be sql statements
// ONE function or one that returns and one that edits -- these ones will take parameters.

const allEmployees = `SELECT e.id AS employee_id, e.first_name, e.last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, CASE 
WHEN e.manager_id IS NULL THEN 'no manager' ELSE CONCAT(m.first_name,' ', m.last_name) END AS manager
FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id;`;

const allRoles = `SELECT role.id AS role_id, role.title AS job_title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id;`

function figureOutQuery(activity) {
    if (activity === 'View All Employees'){
        sql = allEmployees;
    }
    if (activity === 'View All Roles'){
        sql = allRoles;
    }
    queryDbwithResults(sql);
}

function queryDbwithResults(sql) {
    db.query(sql, (err, rows) => {//input selected sql
    if (err) {
        console.log(err.message);
    }
    console.table(rows);
    //getActivity()
})
};



