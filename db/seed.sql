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
    ('Representative', 50000, 3)
    ('Senator', 75000, 3),
    ('Chancellor', 125000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('First', 'Last', 1, 1),
    ('First', 'Last', 3, 1),
    ('First', 'Last', 2, 2);
