//设置表格格式
var form =layui.form;
var layer =layui.layer;
form.verify({
    nickname:function(value){
        if(value.length > 6){
            return "输入用户名不能大于6位";
        }
    }
})

initUserInfo()
function initUserInfo(){
    $.ajax({
        method:"get",
        url:"/my/userinfo",
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取用户信息失败');
            }
            //快速为表单赋值
            form.val("formuserInfo",res.data);
        }
    })
}
$("#btnreset").on("click",function(e){
    e.preventDefault();
    initUserInfo();
})
$(".layui-form").on("submit",function(e){
    e.preventDefault();
    $.ajax({
        method:"post",
        url:"/my/userinfo",
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                 layer.msg("获取用户信息失败");
                 console.log(res);
                
            }
            layer.msg("更新用户信息成功")
            initUserInfo();
            window.parent.getUserInfo();
        }
    })
})