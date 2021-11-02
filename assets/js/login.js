//点击切换注册和登录界面
$("#link_reg").on("click",function(){
    $(".login-box").hide();
    $(".reg-box").show();
})
$("#link_login").on("click",function(){
    $(".reg-box").hide();
    $(".login-box").show();
})
//设置verify的自定义属性 
var form = layui.form;
var layer = layui.layer;
form.verify({
    pass: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ] ,
    repass:function(value){
        var password =$(".repass").val();
        if(password!==value){
            return "两次密码输入不正确"
        }
    }
});
//监听注册表单的点击事件
$("#form_reg").on("submit",function(e){
    //阻止自动提交
    e.preventDefault();
    //发起Ajax请求
    $.post('/api/reguser',{
        username:$("#form_reg [name='username']").val(),
        password:$("#form_reg [name='password']").val()
    },function(res){
        if(res.status!==0){
            layer.msg("用户名以重复请重试");
        }else{
            layer.msg("注册成功");
        }
        $("#link_login").click();
    })
})
$("#form_login").on("submit",function(e){
    //阻止默认事件
    e.preventDefault();
    //发起get请求
    $.ajax({
        url:"/api/login",
        method:'post',
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.msg("登陆失败");
            }
            layer.msg("登陆成功");
            localStorage.setItem("token",res.token);
            location.href='index.html';
        }
    })
})