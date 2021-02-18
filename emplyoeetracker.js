const mysql = require('mysql')
const inquirer = require('inquirer')
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '',
    database: 'employee_tracker_db',
});

connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

// need to change all the cases to be relevent to the actual homework questions
const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    viewEmployees();
                    break;

                case 'View All Employees By Department':
                    viewDepartment();
                    break;

                case 'View All Employees By Manager':
                    viewManager();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    upateEmployeeRole();

                case 'Update Employee Manager':
                    updateEmployeeManager();

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
 
const viewEmployees = () => {
    connection.query('SELECT id, first_name, last_name, FROM employee INNER JOIN role ON title, department_id, salary OUTER JOIN employee ON manager_id'
     (err,res) => {
        if(err) throw err
        res.foreEach((employees) => {
            const table = cTable.getTable([
                {
                    id: `${employees.id}`,
                    first_name: `${employee.first_name}`,
                    last_name: `${employee.last_name}`,
                    role_id: `${employees.role_id}`,
                    manager_id: `${employees.manager_id}`
                }
            ])
        }
    }
    console.table([

    ])
}