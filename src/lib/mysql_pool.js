var mysql = require('mysql2');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "123456",
    database: 'mathdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.log("pool");

var dbquery =   function(sql){
  return    pool.query(sql, function (error, results) {
        if (error) throw error;
        // console.log(results);
    })
}
export {dbquery}
