const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '69.46.24.234',
    user: 'powerBench',
    database: 'isos',
    password: '99&powerBench_%23'


    // host: 'localhost',
    // user: 'root',
    // database: 'isos',
    // password: ''
});
connection.connect();
module.exports = connection;