-- Write your schema here --
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  employee_name VARCHAR(30) NOT NULL,
  category_name VARCHAR(100) NOT NULL,
--   category_id INT NOT NULL,
  price INT NOT NULL,
  in_stock BOOLEAN DEFAULT false NOT NULL,
  PRIMARY KEY (id),
--   FOREIGN KEY (category_id) REFERENCES categories(id)
);

--   FOREIGN KEY (category_name) REFERENCES categories(category_name)
