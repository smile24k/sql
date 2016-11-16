/*
* @Author: Haitai
* @Date:   2016-11-15 14:05:32
* @Last Modified by:   Haitai
* @Last Modified time: 2016-11-15 14:06:00
*/

'use strict';
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myblog'
});
exports.query = (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (error, result, fields) => {
        if (error) {
            reject(error);
        } else {
            resolve(result, fields);
        }
    });
});