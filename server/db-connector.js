var mysql = require('mysql')

var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : 'cs340_oluyoler'
});

// Export it for use in our application
module.exports.pool = pool;
