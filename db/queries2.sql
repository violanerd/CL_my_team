-- what finally worked - inner join was the issue. 
SELECT e.id, e.first_name, e.last_name, CASE 
WHEN e.manager_id IS NULL THEN 'no manager' ELSE CONCAT(m.first_name,' ', m.last_name) END AS manager
FROM
    employee e
LEFT JOIN employee m ON 
    m.id = e.manager_id;

SELECT 
    CONCAT(m.first_name, ' ', m.last_name) AS Manager,
    CONCAT(e.first_name, ' ', e.last_name) AS 'Employee'
FROM
    employee e
INNER JOIN employee m ON 
    m.id = e.manager_id
ORDER BY 
    Manager;