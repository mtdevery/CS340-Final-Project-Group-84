var mysql = require('mysql')

// 
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_oluyoler',
    password        : '0906',
    database        : 'cs340_oluyoler'
});

// Export it for use in our application
module.exports.pool = pool;