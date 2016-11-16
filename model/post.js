/**
 *
 */
var db = require('../config/default');
/**
 *发表文章
 *
 */
function Post(name, title, post, time) {
    this.name = name;
    this.title = title;
    this.post = post;
    this.time = time;
};


Post.create = (obj) => {
    if (!obj) {
        return null;
    }
    return new Post(obj.name, obj.title, obj.post, obj.time);
};

/**
 *存储文章
 */
Post.prototype.save = function() {
    console.log(24555);
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO posts SET ?`, this)
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

/**
 *获取文章
 */
Post.getList = (name) => new Promise((resolve, reject) => {
    db.query(`SELECT * FROM posts WHERE name = '${name}' limit 10`)
        .then((result) => {
            //var user = Post.create(result);
            resolve(result);
        })
        .catch(reject);
});

/**
 *编辑文章
 */


/**
 *更新文章
 */

/**
 *删除文章
 */
module.exports = Post;