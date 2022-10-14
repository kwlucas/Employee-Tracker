use employee_db;

INSERT INTO department
    (name)
VALUES
    ('Jedi'),
    ('Military'),
    ('Government');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Padawan', 30000, 1),
    ('Knight', 60000, 1),
    ('Master', 100000, 1),
    ('Captain', 35000, 2),
    ('Commander', 55000, 2),
    ('Admiral', 65000, 2),
    ('Representative', 50000, 3),
    ('Senator', 75000, 3),
    ('Chancellor', 125000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Padme', 'Amidala', 8, NULL),
    ('Anakin', 'Skywalker', 2, 1),
    ('Ahsoka', 'Tano', 1, 2),
    ('Obi-Wan', 'Kenobi', 3, NULL),
    ('Gial', 'Ackbar', 4, NULL),
    ('Cody', 'CC-2224', 5, 4),
    ('Rex', 'CT-7567', 4, 2),
    ('Sheev', 'Palpatine', 9, NULL),
    ('Wullf', 'Yularen', 6, 8),
    ('Jar Jar', 'Binks', 7, 8);
