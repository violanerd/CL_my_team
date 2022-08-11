-- view all departments
SELECT id AS department_id, name AS department_name FROM department;
-- view all roles
SELECT role.id AS role_id, role.title AS job_title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id; 
-- view all employees, department.name AS department_name
SELECT employee.id AS employee_id, first_name, last_name, role.title AS job_title, role.salary AS salary, department.name AS department_name, employee.manager_id AS manager
FROM employee INNER JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id; 