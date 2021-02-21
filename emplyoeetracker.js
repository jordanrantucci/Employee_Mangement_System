const mysql = require('mysql')
const inquirer = require('inquirer')
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'ThinkPad$1989',
    database: 'employee_tracker_db',
});



// need to change all the cases to be relevent to the actual homework questions
const runSearch = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Exit'
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

                case 'Exit':
                    connection.end()
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });

    }; 

const viewEmployees = () => {
    const query ='SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT OUTER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id'
    connection.query(query, (err,res) => {
        if(err) throw err
       console.table(res)
       runSearch()
        })
    }

const viewDepartment = () => {
        inquirer.prompt([
        {
            type: 'list',
            message: 'Which department would you like to view?',
            choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
            name: 'chooseDepartment'
        }
     ])
    .then(answer => {
    const query = 'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT OUTER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE ?'
    connection.query(query, {name: answer.chooseDepartment}, (err,res) => {
        if (err) throw err
        console.table(res)
        runSearch()
        })
    })
}

const viewManager = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err,res) => {
        if (err) throw err
        console.table(res)
        runSearch()
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
        runSearch()
    })
}

const removeEmployee = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
        runSearch()
    })
}

const upateEmployeeRole = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
        runSearch()
    })
}

const updateEmployeeManager = () => {
    const query = 'SELECT * employee'
    connection.query(query, (err, res) => {
        if (err) throw err
        console.table(res)
        runSearch()
    })
}

connection.connect((err) => {
    if(err) throw err
    runSearch()
})