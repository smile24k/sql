(function () {
    //if(parseInt(location.pathname.split('/')[2]) == 1){
    //    document.querySelector('#prePage').setAttribute('disabled','disabled');
    //
    //}
    document.querySelector('#nextPage').addEventListener('click', function () {
        //s为参数最后面的数字
        var s = parseInt(location.pathname.split('/')[2]);

        var pageAllItem = document.querySelectorAll("#pageAllItem").length;
        if(pageAllItem != 5){
            this.setAttribute('disabled','disabled');
            alert('已经是最后一页了')
            return false;
            location.pathname = `/my_post/${s}`;
        }else{
            s++;
            location.pathname = `/my_post/${s}`;
        }

    })
    document.querySelector('#prePage').addEventListener('click', function () {
        var s = parseInt(location.pathname.split('/')[2]);
        if(s == 1){
            this.setAttribute('disabled','disabled');
            alert('已经是第一页了')
            return false;
            location.pathname = `/my_post/${s}`;
        }else{
            s--;
            location.pathname = `/my_post/${s}`;
        }


    })
})()