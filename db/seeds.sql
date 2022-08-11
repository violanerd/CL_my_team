INSERT INTO department (name) VALUES ('kitchen'), ('house');

INSERT INTO role (title, salary, department_id) VALUES 
('cook', 50000.00, 1),
('server', 25000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Rob', 'Cook', 1, NULL),
('Bob', 'Server', 2, 1);