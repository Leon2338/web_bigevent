$(function(){
    getUserInfo()
    var layer = layui.layer;
//实现退出按钮的效果--------------------------------------------------------
    $("#logout").on("click",function(){
        //调用layui中的“弹出层”中的“confirm”
        layer.confirm('确定退出登录', {icon: 3, title:'提示'}, function(index){
            //清空localstorage
            localStorage.removeItem("token");
            //回到登陆页面
            location.href="login.html";
            
            layer.close(index);
          });
    })
})
//获取用户个人信息-----------------------------------------------------------
function getUserInfo(){
    $.ajax({
        method:"get",
        url:"/my/userinfo",
        headers:{
            Authorization:localStorage.getItem("token")
        },
        success:function(res){
            if (res.status!==0){
                return "获取用户信息失败"
            }
            //log测试res
            console.log(res);
            renderAvatar(res.data);
        },
        //防止直接跳到后台
        //complete:function(res){
            //if(res.responseJSON.status==1){
               // localStorage.removeItem("token");
               // location.href='login.html';
           // }
       // }
    })
}


//获取用户头像--------------------------------------------------------------
function renderAvatar(e){
    //获取用户的用户名
    var username = e.nickname||e.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;'+username);
//设置用户的头像
    if (e.user_pic){
    //渲染图片头像
        $(".layui-nav-img").attr("src",e.user_pic).show();
        $(".text-avatar").hide();
    }else{
    //渲染文字头像
        $(".layui-nav-img").hide();
        //获取用户名的第一个字母
        var first = username[0];
        //将字母填入文字头像当中
        $(".text-avatar").html(first).show();
    }
}