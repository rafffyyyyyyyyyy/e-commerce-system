const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
    // ,
    // port: process.env.DB_PORT_NUMBER
});

// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=""
// DB_DATABASE=it_products_db
// DB_PORT=3001
// SECRET_KEY=this is my secret key
// DB_PORT_NUMBER=3307

db.connect((error) => {
    if (error) throw new error;

    console.log("Connected to database!");
});

module.exports = db;