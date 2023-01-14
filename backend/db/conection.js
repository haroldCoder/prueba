const mysql = require("mysql");

const conection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2364144",
    database: "users"
})

module.exports = {conection};