/**
 * 与用户表相关的CRUD
 * 只是针对于用户表做操作
 */

var db = require('../config/default');

/**
 * 用户表的模型（数据容器）
 * @param {number} id        主键
 * @param {string} name  用户名
 * @param {string} password  密码
 * @param {string} email     邮箱
 */
function User(id, name, password, email) {
    this.id = id;
    this.name = name || '';
    this.password = password || '';
    this.email = email || '';
}


/**
 * 将一个包含属性的对象转换为一个User类型
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
User.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new User(obj.id, obj.name, obj.password, obj.email);
};

/**
 * 通过用户名获取用户对象
 * @param  {string} name 用户名
 * @return {User}            用户对象
 */
User.getByUsername = (name) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE name = '${name}'`)
        .then((result) => {
            var row = result[0];
            var user = User.create(row);
            resolve(user);
        })
        .catch(reject);
});

// 实例方法不要用 arrow function
User.prototype.save = function() {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO users SET ?`, this)
            .then((result) => {
                // 判断是否插入成功
                if (result.affectedRows) {
                    this.id = result.insertId; // 拿到刚刚插入的ID
                    resolve(this);
                } else {
                    reject(new Error('插入数据失败' + result.message));
                }
            })
            .catch(reject);
    });
};



module.exports = User;

// 与具体的对象（具象的东西）没关系的定义成静态方法
// 根具象的东西相关的定义为实例方法
