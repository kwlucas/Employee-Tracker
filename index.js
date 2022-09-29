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

const newRolePrompts = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter a title for the new role.',
        validate: (ans) => { //verify that a response was entered.
            if (ans) {
                return true;
            }
            else {
                return 'Please enter a valid title.';
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter a salary for the new role.',
        validate: (ans) => { //verify that a response was entered.
            if (ans && !/[\D]/g.test(ans)) {
                return true;
            }
            else {
                return 'Please enter a valid numerical value.';
            }
        }
    },
    {
        type: 'list',
        name: 'department',
        message: "What departments is the new role in?",
        choices: function () {
            //get list of departments
            let options = [''];
            for (let i = 0; i < array.length; i++) {
                options.push(array[i]);
            }
            return options;
        },
    },
]

const newEmployeePrompts = [
    {
        type: 'input',
        name: 'firstName',
        message: 'What is the new employee\'s first name?',
        validate: (ans) => { //verify that a response was entered.
            if (ans) {
                return true;
            }
            else {
                return 'Please enter a valid name.';
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'What is the new employee\'s last name?',
        validate: (ans) => { //verify that a response was entered.
            if (ans) {
                return true;
            }
            else {
                return 'Please enter a valid name.';
            }
        }
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the new employee's role?",
        choices: function () {
            //get list of roles
            let options = [''];
            for (let i = 0; i < array.length; i++) {
                options.push(array[i]);
            }
            return options;
        },
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the new employee's manager?",
        choices: function () {
            //get list of employees
            let options = [''];
            for (let i = 0; i < array.length; i++) {
                options.push(array[i]);
            }
            return options;
        },
    },
]

const updateRolePrompts = [
    {
        type: 'list',
        name: 'employee',
        message: "Select an employee to update.",
        choices: function () {
            //get list of employees
            let options = [''];
            for (let i = 0; i < array.length; i++) {
                options.push(array[i]);
            }
            return options;
        },
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: function () {
            //get list of roles
            let options = [''];
            for (let i = 0; i < array.length; i++) {
                options.push(array[i]);
            }
            return options;
        },
    },
]
//[, , , , , , , 'Exit'],

async function launch() {
    const ans = await inquirer.prompt(rootPrompt);

    switch (ans) {
        case 'View all departments':
            await viewAll('departments');
            break;
        case 'View all roles':
            await viewAll('roles');
            break;
        case 'View all employees':
            await viewAll('employees');
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateRole();
            break;
        default:
            console.log('Goodbye.');
            process.exitCode = 0;
            break;
    }
}