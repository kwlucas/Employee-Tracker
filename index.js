const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');

const rootPrompt = [
    {
        type: 'list',
        name: 'rootSelection',
        message: "Select an action.",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'],
    }
]

const newDepartmentPrompt = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the new department.',
        validate: (ans) => { //verify that a response was entered.
            if (ans) {
                return true;
            }
            else {
                return 'Please enter a valid name.';
            }
        }
    }
]