import mysql from 'mysql';
import config from './config';

const database = {
    host     : config.mySql.HOST,
    user     : config.mySql.USER,
    password : config.mySql.PASSWORD,
    database : config.mySql.DATABASE
};

const pool = mysql.createPool(database);


const execute =  async (conn, query, params) => {
    return new Promise((resolve, reject) => {
        conn.query(query, params, function (err, result) {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

const createConnection = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                return reject(err);
            }
            return resolve(conn);
        });
    });
};

const createPersistentConnection = () => {
    return new Promise((resolve, reject) => {
        const conn = mysql.createConnection(database);
        conn.connect((err) => {
            if (err) { return reject(err); }
            return resolve(conn);
        });
    });
};

const closeConn = (conn) => {
   if (conn) {
        conn.release();
    }
};

module.exports.execute = execute;
module.exports.getConnection = createConnection;
module.exports.getPersistentConnection = createPersistentConnection;
module.exports.closeConn = closeConn;
