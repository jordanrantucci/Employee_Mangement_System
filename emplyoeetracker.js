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
    const query ='SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, contact(m.first_name, " ", m.last_name), AS manager FROM employees e LEFT join EMPLOYEES M on e.manager_id = m.id LEFT OUTER JOIN role ON e.role_id = role.is INNER JOIN department ON role.department_id = department.id'
    connection.query(query, (err,res) => {
        if(err) throw err
       console.table(res)
       promptUser()
        })
    }

const viewDepartment = () =>{
    const query = 'SELECT employees.id, employees.first_name, employees.last_name, role.totle FROM employees LEFT OUTER JOIN role ON employees.role_id = role.id'
    connection.query(query, (err,res) => {
        if (err) throw err
        console.table(res)
    })

}

const viewManager = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err,res) => {
        if (err) throw err
        console.table(res)
    })

}

const addEmployee = () => {
    const query = 'SELECT title FROM role'
    connection.query(query, (err, res) => {
        if (err) throw err
        inquirer
            .prompt([{
                name: "addFirstName",
                type: "input",
                message: "What is the New Employee's First Name?"
            },
            {
                name:"addLastName",
                type: "input",
                message: "What is the New Employee's Last Name?"
            },
            {
                name: "NewEmployeeRole",
                type: "list",
                message: "What is the New Employee's Title?",
                choices: res
            }
        ])
        console.table(res)
    })
}

const removeEmployee = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
    })
}

const upateEmployeeRole = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
    })
}

const updateEmployeeManager = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
    })
}

connection.connect((err) => {
    if(err) throw err
    promptUser()
})