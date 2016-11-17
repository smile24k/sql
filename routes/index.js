var express = require('express');
var router = express.Router();
var User = require('../model/user');
var Post = require('../model/post');
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
    // 根据用户传入的用户名判断是否已经存在
    User.getByUsername(req.body.name)
        .then(user => {
            // 查询成功了，但是有没有查到数据不知道
            if (user) {
                return Promise.reject(new Error('用户名已存在！'));
            }
            // 用户名不存在
            return User.create({
                name: req.body.name,
                password: req.body.password
            }).save();
        })
        .then(user => {
            res.redirect('/login');
        })
        .catch(error => {
            // promise 过程中出现错误了
            res.render('register', { message: error.message });
        });
});
//登录
router.get('/login', (req, res, next) => {

    res.render('login', { message: '' });
});

router.post('/login', (req, res, next) => {
    User.getByUsername(req.body.name)
        .then(user => {
            if (!user) {
                return Promise.reject(new Error('用户名或密码错误！'));
            }
            // 用户名存在 校验密码
            if (user.password !== req.body.password) {
                return Promise.reject(new Error('用户名或密码错误！'));
            }
            // res.cookie('current_user', user);
            req.session.user_name = user;
            // 跳转
            res.redirect('/index');
        })
        .catch(error => {
            res.render('login', { message: error.message });
        });

});


router.get('/post', checkLogin, (req, res, next) =>{
    res.locals.name = req.session.user_name.name;
    res.render('post');
})
//保存用户发表的文章
router.post('/post', (req, res, next) => {
    if(req.body.title != ''){
        Post.create({
            name: req.session.user_name.name,
            post: req.body.post,
            title: req.body.title,
            time: new Date()
        }).save();
    }
    res.redirect('/my_post/1')
});

//我的blog文章列表
//router.get('/my_post',checkLogin, (req, res, next) => {
//    //从数据库取数据
//    Post.getList(req.session.user_name.name)
//        .then((user) => {
//            res.locals.name = req.session.user_name.name;
//            res.locals.titles = user;
//            res.render('mypost');
//        }).catch((err) => {throw err;});
//
//});


//翻页操作
router.get('/my_post/:page',checkLogin, (req, res, next) => {
    console.log(req.params.page);

    //判断是否是第一页，并把请求的页数转换成 number 类型
    var page = req.params.page > 0 ? parseInt(req.params.page) : 1;
    Post.getList(req.session.user_name.name, page)
        .then((user) => {
            res.locals.name = req.session.user_name.name;
            res.locals.titles = user;
            res.render('mypost');
        }).catch((err) => {throw err;});

});

//index页
router.get('/index',checkLogin, (req, res, next) => {
    res.locals.name = req.session.user_name.name;
    res.render('index');
});


//检查是否登录
function checkLogin(req, res, next){
    //检查session对象是否存在
    if(!req.session.user_name){
        return res.redirect('/login');
    }
    next();
}
module.exports = router;
