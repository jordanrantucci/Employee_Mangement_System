USE employee_tracker_db;

INSERT into department (name) 
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


INSERT into role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 2),("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 2),("Accountant", 125000, 1),("Legal Team Lead", 250000, 1),
("Lawyer", 190000, 2);

INSERT into employee (first_name, last_name, role_id, manager_id) 
VALUES ("Bruce", "Banner", 1, null), ("Peter", "Parker", 2, 1), ("Pepper", "Potts", 3, 2);

SELECT * FROM employee;
SELECT * fROM role;
SELECT * FROM department;