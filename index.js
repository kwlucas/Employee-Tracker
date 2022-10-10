const mysql = require('mysql2');
const inquirer = require("inquirer");
const cTable = require('console.table');
const con = require("./db/connection");

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
        choices: async function () {
            //get list of departments
            let options = [''];
            const departments = await con.promise().query('SELECT department.id, depatment.name FROM department');
            await departments.forEach(async function(department) {
                let option = {
                    name: department.name,
                    value: department.id
                }
                options.push(option);
            })
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
        choices: async function () {
            //get list of roles
            let options = [''];
            const roles = await con.promise().query('SELECT role.id, role.title FROM role');
            await roles.forEach(async function(role) {
                let option = {
                    name: role.title,
                    value: role.id
                }
                options.push(option);
            })
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

async function launch() {
    const ans = await inquirer.prompt(rootPrompt);

    switch (ans) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            await viewAllEmployees();
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

async function viewAllDepartments() {
    const results = await con.promise().query('SELECT department.* FROM department');
    console.table(results);
}

async function viewAllRoles() {
    const results = await con.promise().query('SELECT role.id, role.title, role.salary, department.name FROM role JOIN departments ON role.department_id = department.id');
    console.table(results);
}

async function viewAllEmployees() {
    const results = await con.promise().query('SELECT employee.id employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON employee.department_id = department.id JOIN employee manager on manager.id = employee.manager_id');
    console.table(results);
}

async function addDepartment() {
    const ans = await inquirer.prompt(newDepartmentPrompt);
    console.log(ans);
    await con.promise().query('INSERT INTO department (name) VALUES (?)', [ans.name] );

}

async function addRole() {
    const ans = await inquirer.prompt(newRolePrompts);
    console.log(ans);
    await con.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [ans.title, ans.salary, ans.departmentId]);
}

async function addEmployee() {
    const ans = await inquirer.prompt(newEmployeePrompts);
    console.log(ans);
    await con.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [ans.firstName, ans.lastName, ans.roleId, ans.managerId]);
}