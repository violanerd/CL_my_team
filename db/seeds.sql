INSERT INTO department (name) VALUES ('kitchen'), ('house'), ('bar');

INSERT INTO role (title, salary, department_id) VALUES 
('cook', 50000.00, 1),
('server', 25000.00, 2),
('dishwasher', 15000.00, 1),
('bartender', 40000.00, 3),
('house manager', 50000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Stephanie', 'Izard', 1, NULL),
('Betty', 'Black', 5, NULL),
('Bob', 'White', 2, 2),
('Rachel', 'Ray', 3, 1),
('Sam', 'Ross', 4, 2),
('Lady', 'Grey', 2, 2);