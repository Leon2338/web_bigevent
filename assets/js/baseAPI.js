//每次调用ajax时都会调用这个ajaxPrefilter-------------------------------------

$.ajaxPrefilter(function(option){
    option.url='http://api-breakingnews-web.itheima.net'+option.url
    //为请求添加header
    if(option.url.indexOf('/my/')!==-1){
        option.headers= { Authorization:localStorage.getItem("token")};
    }
    //为每一次请求添加complete
    option.complete=function(res){
        if(res.responseJSON.status==1){
            localStorage.removeItem("token");
            location.href='login.html';
        }
    }
})