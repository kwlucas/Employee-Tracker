const inquirer = require("inquirer");
//const cTable = require('console.table');
require('console.table');
const con = require("./db/connection");

const rootPrompt = [
    {
        type: 'list',
        name: 'rootSelection',
        message: "Select an action.",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager', 'Remove a department', 'Remove a role', 'Remove an employee', 'Exit'],
        default: 0
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
        message: "What department is the new role in?",
        choices: async function () {
            //get list of departments
            let options = [];
            const departments = await con.promise().query('SELECT department.id, department.name FROM department');
            await departments[0].forEach(async function (department) {
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
            let options = [];
            const roles = await con.promise().query('SELECT role.id, role.title FROM role');
            await roles[0].forEach(async function (role) {
                let option = {
                    name: role.title,
                    value: role.id
                }
                options.push(option);
            })
            options.push({ name: 'None', value: null });
            return options;
        },
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the new employee's manager?",
        choices: async function () {
            //get list of employees
            let options = [];
            const employees = await con.promise().query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name ) AS name FROM employee');
            await employees[0].forEach(async function (employee) {
                let option = {
                    name: employee.name,
                    value: employee.id
                }
                options.push(option);
            })
            options.push({ name: 'None', value: null });
            return options;
        },
    },
]

const updateRolePrompts = [
    {
        type: 'list',
        name: 'employee',
        message: "Select an employee to update.",
        choices: async function () {
            //get list of employees
            let options = [];
            const employees = await con.promise().query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name ) AS name FROM employee');
            await employees[0].forEach(async function (employee) {
                let option = {
                    name: employee.name,
                    value: employee.id
                }
                options.push(option);
            })
            return options;
        },
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the employee's new role?",
        choices: async function () {
            //get list of roles
            let options = [];
            const roles = await con.promise().query('SELECT role.id, role.title FROM role');
            await roles[0].forEach(async function (role) {
                let option = {
                    name: role.title,
                    value: role.id
                }
                options.push(option);
            })
            options.push({ name: 'None', value: null });
            return options;
        },
    },
]

const updateManagerPrompts = [
    {
        type: 'list',
        name: 'employee',
        message: "Select an employee to update.",
        choices: async function () {
            //get list of employees
            let options = [];
            const employees = await con.promise().query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name ) AS name FROM employee');
            await employees[0].forEach(async function (employee) {
                let option = {
                    name: employee.name,
                    value: employee.id
                }
                options.push(option);
            })
            return options;
        },
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's new manager?",
        choices: async function () {
            //get list of employees
            let options = [];
            const employees = await con.promise().query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name ) AS name FROM employee');
            await employees[0].forEach(async function (employee) {
                let option = {
                    name: employee.name,
                    value: employee.id
                }
                options.push(option);
            })
            options.push({ name: 'None', value: null });
            return options;
        },
    },
]

const removeDepartmentPrompt = [
    {
        type: 'list',
        name: 'department',
        message: "Select a department to remove.",
        choices: async function () {
            //get list of departments
            let options = [];
            const departments = await con.promise().query('SELECT department.id, department.name FROM department');
            await departments[0].forEach(async function (department) {
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

const removeRolePrompt = [
    {
        type: 'list',
        name: 'role',
        message: "Select a role to remove.",
        choices: async function () {
            //get list of roles
            let options = [];
            const roles = await con.promise().query('SELECT role.id, role.title FROM role');
            await roles[0].forEach(async function (role) {
                let option = {
                    name: role.title,
                    value: role.id
                }
                options.push(option);
            })
            return options;
        },
    }
]

const removeEmployeePrompt = [
    {
        type: 'list',
        name: 'employee',
        message: "Select an employee to remove.",
        choices: async function () {
            //get list of employees
            let options = [];
            const employees = await con.promise().query('SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name ) AS name FROM employee');
            await employees[0].forEach(async function (employee) {
                let option = {
                    name: employee.name,
                    value: employee.id
                }
                options.push(option);
            })
            return options;
        },
    }
]

const sortEmployeesByPrompt = [
    {
        type: 'list',
        name: 'sortBy',
        message: 'View employees by...',
        choices: ['ID (Default)', 'Department', 'Manager'],
        default: 0
    },
]

const continuePrompt = [
    {
        type: 'input',
        name: 'continue',
        message: 'Press enter to continue.',
    },
]

async function viewAllDepartments() {
    //Get all departments
    const results = await con.promise().query('SELECT department.* FROM department');
    console.table(results[0]);
}

async function viewAllRoles() {
    //get all roles and the names of the coresponding departments
    const results = await con.promise().query('SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department ON role.department_id = department.id');
    console.table(results[0]);
}

async function viewAllEmployees() {
    //get all employees with their coresponding manager's full name, role's salary and department name
    const results = await con.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id');
    console.table(results[0]);
}

async function viewEmployeesByDepartment() {
    //get all employees with their coresponding manager's full name, role's salary and department name sort them all by their departments
    const results = await con.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY department');
    console.table(results[0]);
}

async function viewEmployeesByManager() {
    //get all employees with their coresponding manager's full name, role's salary and department name sort them all by their manager
    const results = await con.promise().query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager');
    console.table(results[0]);
}

async function addDepartment() {
    //Ask for department name
    const ans = await inquirer.prompt(newDepartmentPrompt);
    console.log(ans);
    //Create new department with the input name
    await con.promise().query('INSERT INTO department (name) VALUES (?)', [ans.name]);

}

async function addRole() {
    //Ask the new role prompts
    const ans = await inquirer.prompt(newRolePrompts);
    console.log(ans);
    //Create new roles with user reponse to prompts
    await con.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [ans.title, ans.salary, ans.department]);
}

async function addEmployee() {
    //Ask new employee prompts
    const ans = await inquirer.prompt(newEmployeePrompts);
    console.log(ans);
    //Create new employee with responses to prompts
    await con.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [ans.firstName, ans.lastName, ans.role, ans.manager]);
}

async function updateRole() {
    //Ask update employee role prompts
    const ans = await inquirer.prompt(updateRolePrompts);
    console.log(ans);
    //Update the selected employee to have the selected role
    await con.promise().query('UPDATE employee SET role_id = ?  WHERE id = ?', [ans.role, ans.employee]);
}

async function updateManager() {
    //Ask update employee manager prompts
    const ans = await inquirer.prompt(updateManagerPrompts);
    console.log(ans);
    //Update the selected employee to have the selected manager
    await con.promise().query('UPDATE employee SET manager_id = ?  WHERE id = ?', [ans.manager, ans.employee]);
}

async function removeDepartment() {
    const ans = await inquirer.prompt(removeDepartmentPrompt);
    console.log(ans);
    //Delete the selected department
    await con.promise().query('DELETE FROM department WHERE id = ?', [ans.department]);
}

async function removeRole() {
    const ans = await inquirer.prompt(removeRolePrompt);
    console.log(ans);
    //Delete the selected role
    await con.promise().query('DELETE FROM role WHERE id = ?', [ans.role]);
}

async function removeEmployee() {
    const ans = await inquirer.prompt(removeEmployeePrompt);
    console.log(ans);
    //Delete the selected employee
    await con.promise().query('DELETE FROM employee WHERE id = ?', [ans.employee]);
}

async function launch() {
    //Ask root prompt
    const { rootSelection } = await inquirer.prompt(rootPrompt);
    //Switch statement based on response to root prompt
    switch (rootSelection) {
        case 'View all departments':
            await viewAllDepartments();
            break;
        case 'View all roles':
            await viewAllRoles();
            break;
        case 'View all employees':
            //Prompt for sorting employees
            const { sortBy } = await inquirer.prompt(sortEmployeesByPrompt);
            if(sortBy === 'Department') {
                await viewEmployeesByDepartment();
            }
            else if(sortBy === 'Manager') {
                await viewEmployeesByManager();
            }
            else {
                await viewAllEmployees();
            }
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
        case 'Update an employee manager':
            await updateManager();
            break;
        case 'Remove a department':
            await removeDepartment();
            break;
        case 'Remove a role':
            await removeRole();
            break;
        case 'Remove an employee':
            await removeEmployee();
            break;
        default:
            console.log('Goodbye.');
            process.exitCode = 0;
            return;
            break;
    }
    //"Press enter to continue" prompt
    await inquirer.prompt(continuePrompt);
    //Loop
    await launch();
    return;
}

launch();