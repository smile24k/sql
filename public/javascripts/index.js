(function () {
    //if(parseInt(location.pathname.split('/')[2]) == 1){
    //    document.querySelector('#prePage').setAttribute('disabled','disabled');
    //
    //}
    document.querySelector('#nextPage').addEventListener('click', function () {
        //s为参数最后面的数字
        var s = parseInt(location.pathname.split('/')[2]);

        var pageAllItem = document.querySelectorAll(".pageAllItem").length;
        if(pageAllItem != 10){
            this.setAttribute('disabled','disabled');
            return false;
            location.pathname = `/index/${s}`;
        }else{
            s++;
            location.pathname = `/index/${s}`;
        }

    })
    document.querySelector('#prePage').addEventListener('click', function () {
        var s = parseInt(location.pathname.split('/')[2]);
        if(s == 1){
            this.setAttribute('disabled','disabled');
            return false;
            location.pathname = `/index/${s}`;
        }else{
            s--;
            location.pathname = `/index/${s}`;
        }


    })
})()