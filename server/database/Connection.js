const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT_NUMBER
});

db.connect((error) => {
    if (error) throw new error;

    console.log("Connected to database!");
});

module.exports = db;