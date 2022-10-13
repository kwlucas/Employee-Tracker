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
    ('Role 1', 100, 1),
    ('Role 2', 100, 1),
    ('Role 3', 100, 2);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('First', 'Last', 1, 1),
    ('First', 'Last', 3, 1),
    ('First', 'Last', 2, 2);
