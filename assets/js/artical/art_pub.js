$(function(){
    var layer = layui.layer;
    var form =layui.form;
    //定义加载文章
    initEditor()
    // 1. 初始化图片裁剪器
     var $image = $('#image')
     
     // 2. 裁剪选项
     var options = {
       aspectRatio: 400 / 280,
       preview: '.img-preview'
     }
     
     // 3. 初始化裁剪区域
     $image.cropper(options)
    $.ajax({
        method:'get',
        url:'/my/article/cates',
        success:function(res){
            if(res.status!==0){
                return layer.msg('获取列表失败')
            }
            var innerhtml = template("tpl-cate",res);
            $('#form-sel').html(innerhtml)
            form.render();
        }
    })
    //未选择事件的按钮添加点击事件
    $("#btnChooseImage").on("click",function(){
        $("#ChooseFile").click();
    })
    $("#ChooseFile").on("change",function(e){
        //判断用户是否选择了文件
        if(e.target.files.length<=0){
            return
        }
        var file = e.target.files[0];
        var newImageURL = URL.createObjectURL(file);
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImageURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
    })
    var art_state='已发布';
    $("#save2").on("click",function(){
     art_state='草稿'
    })
    //提交数据
    $("#form-pub").on("submit",function(e){
        e.preventDefault();
        //基于formdata创建数据对象
        var fd =new FormData($(this)[0]);
        //将文章的发布状态添加到fd中
        fd.append("state",art_state);
        //将裁剪过的文件添加成文件格式
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
         width: 400,
         height: 280
         })
         .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        fd.append("cover_img",blob);
        //发起ajax请求
        publichArticle(fd);
        })
    })
    function publichArticle(fd){
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:fd,
            //如果向服务器是formdata格式的数据必须添加以下两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status!==0){
                    return layer.msg("发布文章失败")
                }
                layer.msg("发布文章成功")
                location.href="art_list.html"
            }
        })
    }
})