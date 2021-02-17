const mysql = require('mysql')
const inquirer = require('inquirer')

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
                case 'Find songs by artist':
                    artistSearch();
                    break;

                case 'Find all artists who appear more than once':
                    multiSearch();
                    break;

                case 'Find data within a specific range':
                    rangeSearch();
                    break;

                case 'Search for a specific song':
                    songSearch();
                    break;

                case 'Find artists with a top song and top album in the same year':
                    songAndAlbumSearch();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};
