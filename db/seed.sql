use employee_db;

INSERT INTO department
    (name)
VALUES
    ('Department 1'),
    ('Department 2');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Role 1', 100, 1),
    ('Role 2', 100, 1),
    ('Role 3', 100, 2);
