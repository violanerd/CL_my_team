const allEmployees = `SELECT e.id AS employee_id, e.first_name, e.last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, CASE 
WHEN e.manager_id IS NULL THEN 'no manager' ELSE CONCAT(m.first_name,' ', m.last_name) END AS manager
FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id`;

const allRoles = `SELECT role.id AS role_id, role.title AS job_title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id`;

const allDepartments = `SELECT id AS department_id, name AS department_name FROM department`;

const viewByManager = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS Manager, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
FROM employee e INNER JOIN employee m ON m.id = e.manager_id ORDER BY Manager`;

const viewByDepartment = `SELECT department.name AS department_name, CONCAT(e.first_name, ' ', e.last_name) AS employee, role.title AS job_title
FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department_name`;

const viewBudget = `SELECT department.name AS department_name, COUNT(role.title) AS 'jobs', SUM(role.salary) AS 'budget'
FROM role JOIN department ON role.department_id = department.id GROUP BY department_name`;

const insertDepartment = `INSERT INTO department (name) VALUES (?)`;
const insertRole = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
const insertEmployee = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
const updateEmployeeRole = `UPDATE employee SET role_id = ? WHERE id = ?`;
const removeADepartment = `DELETE FROM department WHERE id = ?`;
const removeARole = `DELETE FROM role WHERE id = ?`;
const removeAnEmployee = `DELETE FROM employee WHERE id = ?`;
module.exports = [allEmployees, 
    allRoles, 
    allDepartments, 
    viewByManager, 
    viewByDepartment, 
    viewBudget, 
    insertDepartment,
    insertRole, 
    insertEmployee, 
    updateEmployeeRole, 
    removeADepartment,
    removeARole,
    removeAnEmployee];