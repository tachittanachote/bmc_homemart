var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.host, 
    user: process.env.user,
    password: '',
    database: process.env.database
});

con.connect((err) => {
    if(err) throw err;
    console.log("Connected!");
});

setInterval(() => {
    con.query(`SELECT 1`, (err, result) => {
        if (err) reject(err);
    });
}, 5000)

module.exports = con;