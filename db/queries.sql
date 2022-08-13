-- view all departments
SELECT id AS department_id, name AS department_name FROM department;
-- view all roles
SELECT role.id AS role_id, role.title AS job_title, role.salary AS salary, department.name AS department FROM role JOIN department ON role.department_id = department.id; 
-- view all employees with the manager name

SELECT e.id AS employee_id, e.first_name, e.last_name, role.title AS job_title, department.name AS department_name, role.salary AS salary, CASE 
WHEN e.manager_id IS NULL THEN 'no manager' ELSE CONCAT(m.first_name,' ', m.last_name) END AS manager
FROM employee e LEFT JOIN employee m ON m.id = e.manager_id LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id; 



--add a department -- hardcoded value
INSERT INTO department (name) VALUES ('bar');
INSERT INTO department (name) VALUES (?);

--add role -- hardcoded value
INSERT INTO role (title, salary, department_id) VALUES ('bartender', '45000.00', 3);
INSERT INTO role (title, salary, department_id) VALUES (?,?,?);
--add employee - hardcoded; manager should be a namem will have to pull out number
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Max', 'Bartender', 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
(?,?,?,?); 
--update employee role
UPDATE employee SET role_id = ? WHERE id = ?;

--update manager
UPDATE employee SET manager_id = ? WHERE id = ?;

-- view employess by manager: 
SELECT CONCAT(m.first_name, ' ', m.last_name) AS Manager, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
FROM employee e INNER JOIN employee m ON m.id = e.manager_id ORDER BY Manager;

-- view employees by department
SELECT department.name AS department_name, CONCAT(e.first_name, ' ', e.last_name) AS employee, role.title AS job_title
FROM employee e LEFT JOIN role ON e.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY department_name;

 -- view total utilized budget of a department—the combined salaries of all employees in that department.
SELECT department.name AS department_name, COUNT(role.title) AS 'jobs', SUM(role.salary) AS 'budget'
FROM role JOIN department ON role.department_id = department.id GROUP BY department_name; 
