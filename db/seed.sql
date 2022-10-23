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
    ('Sheev', 'Palpatine', 9, NULL),
    ('Padme', 'Amidala', 8, 1),
    ('Mon', 'Mothma', 8, 1),
    ('Jar Jar', 'Binks', 7, 1),
    ('Yoda', 'N/A', 3, NULL),
    ('Anakin', 'Skywalker', 2, 2),
    ('Ahsoka', 'Tano', 1, 2),
    ('Obi-Wan', 'Kenobi', 3, 4),
    ('Wilhuff', 'Tarkin', 4, 7),
    ('Wullf', 'Yularen', 6, 7);
