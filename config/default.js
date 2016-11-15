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
module.exports = pool;