var express = require('express');
var router = express.Router();
var db = require('../config/default');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/login')
});

//注册页
router.get('/register', (req, res, next) => {
    res.render('register', { message: '' });
});
//注册提交
router.post('/register', (req, res, next) => {
    if (!req.body.name) {
        res.render('register', { message: "请输入正确的用户名" });
        return false;
    };
    if (req.body.password == '' || req.body.password !== req.body.confirm) {
        res.render('register', { message: "请确认密码" });
    };
    db.getConnection(function(err, connection) {
        if (err) throw err;
        //密码是否匹配
        connection.query(`SELECT name FROM users WHERE name = '${req.body.name}'`, function(err, rows) {
            if (err) throw err;
            if (rows != '' && rows[0].name === req.body.name) {
                res.render('../views/account-register.hbs', { message: "用户名已存在" });
                return false;
            } else {
                console.log(req.body.name)
                var insert = `INSERT INTO users(name, password) VALUES ('${req.body.name}','${req.body.password}')`;
                db.query(insert, function(err, result) {
                    if (err) throw err;
                });
                res.redirect('/login')
                //res.redirect('/login')
            };
            connection.release();

        });
    })
});
//登录
router.get('/login', (req, res, next) => {

    res.render('login', { message: '' });
});

router.post('/login', (req, res, next) => {
    db.query(`SELECT name FROM users WHERE name = '${req.body.name}' AND password = '${req.body.password}'`, function(err, rows, fields) {
        if (err) throw err;
        if (rows == '' ) {
            res.render('login', { message: "用户名或密码不对" });
        } else{
            //设置cookie session
            res.cookie(`${rows[0].name}`,'liang');
            req.session.user_name = rows[0].name;
            res.redirect('/index');
        };


    });

});

//index页
router.get('/index', (req, res, next) => {
    res.render('index',{message: `${req.session}`});
});
module.exports = router;
