document.querySelector('#send_blog').addEventListener('click', function(){
    var post = '';
    post += `<form method="post" action="/post">
              标题：<br>
                  <input type="text" name="title"><br>
                  正文：<br>
                  <textarea name="post" cols="100" rows="20"></textarea><br>
                  <input type="submit" value="发表">
            </form>`
    document.querySelector('#post_main').innerHTML = post;
})