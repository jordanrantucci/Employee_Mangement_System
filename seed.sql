USE employee_tracker_db;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("Engineering");
INSERT into department (name) VALUES ("Finance");
INSERT into department (name) VALUES ("Legal");

INSERT into role (title, salary, department_id) VALUES ("Sales Lead", 100000, 1)
INSERT into role (title, salary, department_id) VALUES ("Salesperson", 80000, 2)
INSERT into role (title, salary, department_id) VALUES ("Lead Engineer", 150000, 1)
INSERT into role (title, salary, department_id) VALUES ("Software Engineer", 120000, 2)
INSERT into role (title, salary, department_id) VALUES ("Accountant", 125000, 1)
INSERT into role (title, salary, department_id) VALUES ("Legal Team Lead", 250000, 1)
INSERT into role (title, salary, department_id) VALUES ("Lawyer", 190000, 2)

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES