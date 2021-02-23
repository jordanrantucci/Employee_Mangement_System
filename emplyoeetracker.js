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

                // case 'Remove Employee':
                //     removeEmployee();
                //     break;

                // case 'Update Employee Role':
                //     upateEmployeeRole();

                // case 'Update Employee Manager':
                //     updateEmployeeManager();

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
    const query = 'SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, concat(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id LEFT OUTER JOIN role ON e.role_id INNER JOIN department ON role.department_id = department.id ORDER BY manager'
    connection.query(query, (err,res) => {
        if (err) throw err
        console.table(res)
        runSearch()
    })

}

const addEmployee = () => {
    const titleArray = []
    const query = 'SELECT role.id, role.title FROM role'
    connection.query(query, (err, res) => {
        if (err) throw err
        for(i=0;i<res.length;i++){
            titleArray.push(res[i].title)
        }
        const managerArray = []
        const queryM = 'SELECT e.id, e.first_name, e.last_name, concat(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id'
        connection.query(queryM, (err, res) => {
            if (err) throw err
            for(i=0;i<res.length; i++){
                if(res[i].manager !== null){
                managerArray.push(res[i].manager)
            }
        }

        managerArray.unshift('--')

        inquirer
            .prompt([
                {
                type: "input",
                message: "What is the New Employee's First Name?",
                name: "addFirstName",
                validate: function(input){
                    if(input === ""){
                        console.log("Please enter a first name")
                        return false
                    }
                    else {
                        return true
                    }
                }
            },
            {
                type: "input",
                message: "What is the New Employee's Last Name?",
                name:"addLastName",
                validate: function (input) {
                    if (input === "") {
                        console.log("Please enter a last name")
                        return false
                    }
                    else {
                        return true
                    }
                }    
            },
            {
                type: "list",
                message: "What is the New Employee's Title?",
                choices: titleArray,
                name: "NewEmployeeRole"
            },
            {
                type: 'list',
                message: "Who is the new employee's manager?",
                choices: managerArray,
                name: 'newEmployeeManager'
            }
        ])
        .then ((answer) => {
            console.log("employee added")
            const query = 'Select role.id, role.title FROM role'
            connection.query(query, (err, role) => {
                if (err) throw err
                
                // set variables for ID
                let titleID = null
                // get the role ID of the new employee's title
                for(i=0;i<role.length;i++){
                    if (answer.NewEmployeeRole == role[i].title){
                        titleID = role[i].id
                    }
                }

                const queryM = 'SELECT e.id, e.first_name, e.last_name, concat(m.first_name, " ", m.last_name) AS manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id'
                connection.query(queryM, (err, res) => {
                    if (err) throw err
                
                    // set variable for ID
                    let managerID = null
                    let managerName = null
                    let managerNameArray = null
                    console.log(answer.newEmployeeManager)
                    console.log(res[1].manager)

                    // look in the database for the manager's name. match the name with the manager's employee.id
                    // if answer.newEmployeeManager == manager, mangerID, manager.id
                    for (i=0;i<managerArray.length;i++){
                        if (res[i].manager == answer.newEmployeeManager){
                            console.log("this is working")
                            console.log(res[i].manager)
                            managerName = res[i].manager
                            managerNameArray = managerName.split(" ")
                        }
                    }
                    console.log(managerNameArray)
                    

                    const queryE = 'SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id FROM employee'
                    connection.query(queryE, (err, res) => {
                        if (err) throw err
                        console.log(managerNameArray)

                        for(i=0; i<res.length;i++){
                            if (managerNameArray[0] === res[i].first_name){
                                console.log("manager check worked")
                                console.log(res[i].first_name)
                                if(managerNameArray[1] === res[i].last_name){
                                    console.log(res[i].last_name)
                                    console.log(res[i].id)
                                    managerID = res[i].id
                                }
                            }
                        }
                        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?)'
                        const values = [answer.addFirstName, answer.addLastName, titleID, managerID]
                        connection.query(query, [values], (err, res) => {
                            if (err) throw err
                            console.table("New Employee added!")
                            runSearch()
                            })
                        })
                    })
                })
            })   
        })
    })
}

removeEmployee = () => {
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