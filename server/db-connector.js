//var mysql = require('mysql')

//var pool = mysql.createPool({
    //connectionLimit : 10,
    //host            : 'classmysql.engr.oregonstate.edu',
    //user            : 'cs340_oluyoler',
    //password        : '0906',
    //database        : 'cs340_oluyoler'
//});

//// Export it for use in our application
//module.exports.pool = pool;

const mysql = require('mysql') ;
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'password',
    database        : 'events_project'
});

module.exports = pool;