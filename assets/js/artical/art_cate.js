$(function(){
    var layer=layui.layer;
    var form =layui.form;
    initartcateList();
    var indexadd=null;
    var indexedit=null;
    function initartcateList(){
        $.ajax({
            method:"get",
            url:"/my/article/cates",
            success:function(res){
                console.log(res);
                var innerhtml=template('tpl_table',res);
                $("tbody").html(innerhtml);
            }
        })
    }

    //为添加类别按钮导入事件
    $("#btncate").on("click",function(){
        indexadd=layer.open({
            type :1,
            title:"添加文章分类",
            content:$("#dialog_add").html(),
            area: ['500px', '250px']
        })
    })
    $("body").on("submit","#form_add",function(e){
        e.preventDefault();
        $.ajax({
            method:"post",
            url:"/my/article/addcates",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return "添加失败"
                }
                initartcateList()
                layer.close(indexadd);
            }
        })
    })
    $("tbody").on("click",".btn_edit",function(){
        indexedit=layer.open({
            type :1,
            title:"修改文章内容",
            content:$("#dialog_edit").html(),
            area: ['500px', '250px']
        })
        var id =$(this).attr("data-id");
        $.ajax({
            method:"get",
            url:"/my/article/cates/"+id,
            success:function(res){
                form.val("form-edit",res.data)
            }
        })
    })
    //通过代理的方式为修改弹出层表单监听事件
    $("body").on("submit","#form_edit",function(e){
        e.preventDefault();
        $.ajax({
            method:"post",
            url:"/my/article/updatecate",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("请求数据失败")
                }
                layer.msg("修改成功");
                layer.close(indexedit);
                initartcateList()
            }
        })
    })
    //通过代理为删除添加点击事件
    $("tbody").on("click",".btn-delete",function(){
        var id= $(this).attr("data-id");
        layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:"get",
                url:"/my/article/deletecate/"+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg("删除失败")
                    }
                    layer.msg("删除成功");
                    layer.close(index);
                    initartcateList();
                }
            })
            
        })    
    })
})