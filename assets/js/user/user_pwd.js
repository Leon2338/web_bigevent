$(function(){
    var form = layui.form;
    var layer=layui.layer;
    //编写认证规则-----------------------------------------
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        samepwd:function(value){
            if(value==$('[name="oldPwd"]').val()){
                return "新旧密码不能一致";
            }
        },
        confirmPwd:function(value){
            if(value!==$('[name="newPwd"]').val()){

                return "两次密码输入不一致";
            }
        }
    })
    //编写点击事件-----------------------------------------------
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$('.layui-form').serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("修改密码失败");
                    location.href='../login.html';
                }
                layer.msg("修改密码成功");
                $('.layui-form')[0].reset();
            }
        })
    })
})