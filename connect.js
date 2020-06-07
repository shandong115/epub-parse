const mysql = require('mysql');

const pool = new mysql.createPool({
    host: 'localhost',
    user: 'dayou',
    password: 'asdasd321321',
    database: 'bookdb',
    port: 3306
})

const connectMysql = function (sql, callback) {
    pool.getConnection(function (err, connection) {
        connection.query(sql, function (error, results, fields) {
            connection.release();
            callback(error, results, fields)
        })
    })
}

module.exports = connectMysql