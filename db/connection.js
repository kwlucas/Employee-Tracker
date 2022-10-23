const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "", //your SQL user (use 'root' if you are not sure of another user you can use)
  password: "", //The password for your SQL user
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
