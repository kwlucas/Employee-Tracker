use employee_db;

INSERT INTO department
    (name)
VALUES
    ('Operations'),
    ('Finances'),
    ('Engineering');


INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Assistant', 30000, 1),
    ('Specialist', 60000, 1),
    ('Team Lead', 100000, 1),
    ('Intern', 35000, 2),
    ('Analyst', 55000, 2),
    ('Director', 65000, 2),
    ('Apprentice', 50000, 3),
    ('Technician', 75000, 3),
    ('Manager', 125000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Clark', 'Kent', 3, NULL),
    ('Bruce', 'Wayne', 6, NULL),
    ('Diana', 'Prince', 2, 1),
    ('John', 'Jones', 9, NULL),
    ('Shayera', 'Hol', 2, 1),
    ('Oliver', 'Queen', 5, 2),
    ('Dinah', 'Lance', 5, 2),
    ('Vic', 'Sage', 8, 4),
    ('Will', 'Harper', 4, 6),
    ('Dick', 'Grayson', 4, 2),
    ('Zatanna', 'Zatara', 8, 4)

